from django.shortcuts import render
from .models import Bibliography, Note
from .serializers import NoteSerializer, BibliographySerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class NoteList(APIView):
    """
    List all notes, or create a new note.
    """
    def get(self, request, format=None):
        print("************NoteList****************")
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteDetail(APIView):
    """
    Retrieve, update or delete a note instance.
    """
    def get_object(self, pk):
        try:
            return Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        print("************NoteDetail****************"+str(pk))
        note = self.get_object(pk)
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        note = self.get_object(pk)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        note = self.get_object(pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BibliographyList(APIView):
    """
    List all bibliographys, or create a new bibliography.
    """
    def get(self, request, format=None):
        print("************BibliographyList****************")
        bibliographys = Bibliography.objects.all()
        serializer = BibliographySerializer(bibliographys, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = BibliographySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BibliographyDetail(APIView):
    """
    Retrieve, update or delete a bibliography instance.
    """
    def get_object(self, pk):
        try:
            return Bibliography.objects.get(pk=pk)
        except Bibliography.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        print("************BibliographyDetail****************"+str(pk))
        bibliography = self.get_object(pk)
        serializer = BibliographySerializer(bibliography)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        bibliography = self.get_object(pk)
        serializer = BibliographySerializer(bibliography, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        bibliography = self.get_object(pk)
        bibliography.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
