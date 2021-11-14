from django.urls import path

from . import views

urlpatterns = [
    path('bibliographies/',views.BibliographyList.as_view()),
    path('bibliography/<str:pk>',views.BibliographyDetail.as_view()),
    path('notes/',views.NoteList.as_view()),
    path('note/<str:pk>',views.NoteDetail.as_view()),
]
