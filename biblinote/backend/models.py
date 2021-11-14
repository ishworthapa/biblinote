from django.db import models

# Create your models here.
import datetime
from django.utils import timezone

# Create your models here.

class Bibliography(models.Model):
    BIBTYPES = [
        ('RA','Research Article'),
        ('WA','Web Article'),
        ('AV','Audio Video'),
    ]
    # created date should be now
    creation_date = models.DateTimeField(auto_now_add=True)
    bibliography_source = models.TextField(max_length=5000)
    bibliography_title = models.CharField(max_length=500)
    bibliography_type = models.CharField(choices=BIBTYPES,max_length=2)

    def __str__(self):
        return self.bibliography_title


class Note(models.Model):

    bibliography = models.ForeignKey(Bibliography, on_delete=models.CASCADE)
    note_text = models.TextField(blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.note_text
