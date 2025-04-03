from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import InventoryItem
from .serializers import InventoryItemSerializer
from rest_framework.response import Response
from rest_framework import status
from utils.request_utils import set_request_data_mutable
from datetime import datetime, timedelta

class InventoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing inventory items.
    """
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return inventory items belonging to the authenticated user
        print(self.request.user.id)  # (Debugging: print the user ID to the console..
        return self.queryset.filter(added_by=self.request.user.id)

    def create(self, request, *args, **kwargs):
        # Check if the request data is a list
        if isinstance(request.data, list):
            # Validate all items first
            serializers = []
            for item in request.data:
                item['added_by'] = request.user.id  
                serializer = self.get_serializer(data=item)
                serializer.is_valid(raise_exception=True)
                serializers.append(serializer)

            # Save all items if all are valid
            response_data = []
            for serializer in serializers:
                serializer.save(added_by=self.request.user)
                response_data.append(serializer.data)
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            # Handle single object creation
            set_request_data_mutable(request, 'added_by', request.user.id)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        # Update an inventory item
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        # Add the authenticated user as the owner of the inventory item
        request.data['added_by'] = request.user.id

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        # Delete an inventory item
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['delete'], url_path='delete-all')
    def destroy_all(self, request):
        # Delete all inventory items for the authenticated user
        InventoryItem.objects.filter(added_by=request.user.id).delete()
        return Response({"message": "All items deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['post'], url_path='reset')
    def reset_inventory(self, request):
        # Clear all inventory items for the authenticated user
        InventoryItem.objects.filter(added_by=request.user.id).delete()

        # Predefined ingredients to add with unit, quantity, and expiry date
        ingredients = [
            {"name": "Eggs", "unit": "pcs", "quantity": 12},
            {"name": "Chicken", "unit": "kg", "quantity": 1},
            {"name": "White Rice", "unit": "kg", "quantity": 2},
            {"name": "Canned Tomatoes", "unit": "pcs", "quantity": 6},
            {"name": "Onions", "unit": "pcs", "quantity": 5},
            {"name": "Olive Oil", "unit": "ml", "quantity": 500},
            {"name": "Garlic", "unit": "pcs", "quantity": 3},
            {"name": "Banana", "unit": "pcs", "quantity": 6},
            {"name": "Orange", "unit": "pcs", "quantity": 4},
        ]

        # Calculate expiry date as 10 days from today
        expiry_date = datetime.now().date() + timedelta(days=10)

        # Add the predefined ingredients to the user's inventory
        for ingredient in ingredients:
            InventoryItem.objects.create(
            name=ingredient["name"],
            unit=ingredient["unit"],
            quantity=ingredient["quantity"],
            expiration_date=expiry_date,
            added_by=request.user
            )

        return Response({"message": "Inventory reset successfully with predefined ingredients."}, status=status.HTTP_200_OK)