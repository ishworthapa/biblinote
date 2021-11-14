from rest_framework import serializers
from .models import *

class BibliographySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bibliography
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
