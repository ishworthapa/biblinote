# BibliNote: An app for management and sharing of bibliography information and notes

## Introduction
As a graduate student, I often read many research articles, both online and in printed form. In the process I also make notes about the article and highlight lines and paragraphs of interest to me. Similarly, I also listen to technical podcasts, watch video talks or presentation and have notes about them. However, the paper based notes are not scalable and have possibility of losing or misplacing. Similarly, annotation in the PDF version is also not efficient as it is difficult to collectively look for my annotations and also to search with in these annotations. Current state-of-the-art reference manager tools such as Mendeley allows one to highlight texts, create folders for your selected references but there is no note taking functionality. On the other hand, major note applications such as Google Keep, Microsoft OneNote, Evernote, and iOS/Mac OS Notes all provide very efficient note taking functionality in general but lacks the support specific to scholarly articles. For a scholarly article, a major requirement is to allow exporting of references as a bibliography.

The ***BibliNote*** is an app to create notes about a scholarly article, a research paper or a chapter of a book that you just read or a technical podcast or talk that you played. The scholarly article based notes are required to have a ***bibtex*** entry for the source and can ideally have snapshots/images together with rich text. Other web based articles and audio/video presentations may have URL as the source and can themselves be annotated with notes. A complete ***BibliNote*** app could allow sharing of notes and resource links to peers.

### Why this app?

1. This app will let you record all the scholarly articles you read and audio/video you played in one place.
2. Along with the information about the scholarly item, one can add notes to each of the resources.
3. This allows centralized management of all the scholarly resources and corresponding notes with basic search/create/edit/delete/export functionality.
4. This app will allow sharing your resources and the corresponding notes to other users.


## Installation
### Software requirements

1. python3
2. Node.js (Install from package managers or in the download page: https://nodejs.org/en/download/.) 
4. Django, Django Rest Framework and other python packages required for this project are listed in biblinote/requirements.txt. Install those using pip as shown below.
```{bash}
pip install -r biblinote/requirements.txt

cd frontend
npm install
```
### Cloning the app from GitHub
```{bash}
git clone https://github.com/ishworthapa/biblinote.git

```

## Getting Started
### Running the django server
```{bash}
cd biblinote/biblinote
python manage.py runserver
```

### Open REST API endpoints in browser
1. [http://localhost:8000/api/notes/](http://localhost:8000/api/notes/)
2. [http://localhost:8000/api/bibliographies/](http://localhost:8000/api/bibliographies/)

### Running the frontend server
```{bash}
cd biblinote/frontend
npm start
```
## License
GNU GPL3 License.
Copyright (c) Ishwor Thapa 2021
See [LICENSE file](https://raw.githubusercontent.com/ishworthapa/biblinote/main/LICENSE).

# References:
1. https://www.django-rest-framework.org/
2. https://github.com/adamchainz/django-cors-headers
3. https://django-rest-auth.readthedocs.io/en/latest/index.html
4. https://reactjs.org/tutorial/tutorial.html
5. https://github.com/divanov11/Django-React-NotesApp
6. https://react-pdf.org/node
7. https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks
