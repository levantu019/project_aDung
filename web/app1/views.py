from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from app1.models import Icons

# Create your views here.
class IndexClass(View):
    def get(self, request):
        return render(request, 'index.html')


def GetIcon(request, code):
    icon = Icons.objects.filter(code=int(code))[0].image
    return HttpResponse(icon, content_type='image/png')