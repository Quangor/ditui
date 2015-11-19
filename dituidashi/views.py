#-*- coding:utf-8 -*-
# python imports
import locale
import sys
import traceback
import datetime
import json


from django.shortcuts import render_to_response, redirect
from django.template.loader import render_to_string
from django.template import RequestContext
from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator
from django.http import HttpResponse
from django.db import transaction
from django.db.models import F,Sum,Q
from django.forms import ModelForm
from django.views.decorators.csrf import  csrf_exempt

import base64
from django.core.files.base import ContentFile
from dituidashi.testDatas import KNOWLEDGE , CATEGORY ,getKnowledge , getKnowledgeDetail

def knowledge(request, template_name="knowledge/index.html"):
    categoryLists = CATEGORY
    return render_to_response(template_name, RequestContext(request, {
                                                            "status" : "200",
                                                            "categoryLists" : categoryLists,
                                                            "errMsg" : "调用成功"}))
    
def getKnowledgeById(request , cateGoryId,  template_name="knowledge/titleList.html"):
    cateGoryId = int(cateGoryId)
    knowledges = getKnowledge(cateGoryId)
    return render_to_response(template_name, RequestContext(request, {
                                                            "status" : "200",
                                                            "knowledges" : knowledges,
                                                            "errMsg" : "调用成功"}))
@csrf_exempt
def knowledges_earch(request):
    cateGoryId = int(request.POST.get('id'))
    knowledges = getKnowledge(cateGoryId)
    return HttpResponse(json.dumps({ "status" : "200",
                                     "knowledges" : knowledges,
                                     "errMsg" : "调用成功"}), content_type="application/json")
    
def knowledgeDetail(request , knowledgeId, template_name="knowledge/detail.html"):
    knowledgeId = int(knowledgeId) 
    knowledgesDetail = getKnowledgeDetail(knowledgeId)
    return render_to_response(template_name, RequestContext(request, {
                                                            "status" : "200",
                                                            "knowledge" : knowledgesDetail,
                                                            "errMsg" : "调用成功"}))