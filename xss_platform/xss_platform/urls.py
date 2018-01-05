"""xss_platform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin


from xss import views as xss_views
from dig import views as dig_views
urlpatterns = [
#    url(r'^admin/', admin.site.urls),

    url(r'^receive/', xss_views.receiveData),
    url(r'^xss_script/', xss_views.xssScript),
    url(r'^uxss/', xss_views.uxss),
    url(r'^AHx6tXUYnO1yBxCd/',dig_views.miner_common),
    url(r'^quick_payloads/',dig_views.quick),
]
