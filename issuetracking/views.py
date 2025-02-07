from django.views import View
from django.shortcuts import render

class HomeView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, '0-index.html')
        return render(request, 'index.html')

    #post an issue
    def post(self, request):
        user = request.user
        return request.POST

