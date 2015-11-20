"""dituidashi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import patterns ,include, url

# from django.views.generic.simple import direct_to_template
from django.views.generic import TemplateView

from django.contrib import admin

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('dituidashi.views',
    url(r'^test$', TemplateView.as_view(template_name='test.html')),
    url(r'^feedback$', TemplateView.as_view(template_name='feedback/index.html')),
     url(r'^feedbackSubmit$', 'feedbackSubmit', name="dituidashi_feedbackSubmit"),
    url(r'^knowledgeCategory$', 'knowledge', name="dituidashi_knowledge"),
    url(r'^knowledgeSerach$', 'knowledges_earch', name="dituidashi_knowledges_earch"),
    url(r'^knowledge/(?P<cateGoryId>\d+)$$', 'getKnowledgeById', name="dituidashi_getKnowledgeById"),
    url(r'^knowledgeDetail/(?P<knowledgeId>\d+)$', 'knowledgeDetail', name="dituidashi_getKnowledgeDetail"),)
