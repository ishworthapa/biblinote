from rest_framework import serializers
from .models import *

class BibliographySerializer(serializers.ModelSerializer):
    notes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Bibliography
        fields = ['author','id','creation_date','bibliography_source','notes','bibliography_title','bibliography_type']



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
