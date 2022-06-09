from rest_framework import serializers
from app1.models import Icons

class IconsSerializer(serializers.ModelSerializer):

     class Meta:
        model = Icons
        fields = ('name', 'code', 'image')