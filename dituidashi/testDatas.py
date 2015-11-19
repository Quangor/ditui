#coding=utf8
CATEGORY = [{
    "id":0,
    "category":"学习视频"},{
    "id":2,
    "category":"传销类学习资料"},{
    "id":3,
    "category":"推销类学习资料"},{
    "id":4,
    "category":"骗人类学习资料"},{
    "id":5,
    "category":"逃跑类学习资料"},{
    "id":6,
    "category":"自保类学习资料"}];
KNOWLEDGE = [{
    "id" : 0,
    "category":0,
    "title" : "买了个表0",
    "author" : "买买提",
    "time" : "2015-4-17",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
},{
    "id" : 1,
    "category":3,
    "title" : "买了个表1",
    "author" : "阿凡提",
    "time" : "2015-4-18",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
},{
    "id" : 2,
    "category":3,
    "title" : "买了个表2",
    "author" : "拉拉题",
    "time" : "2015-4-27",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
},{
    "id" : 3,
    "category":4,
    "title" : "买了个表3",
    "author" : "不要提",
    "time" : "2015-6-17",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
},{
    "id" : 4,
    "category":5,
    "title" : "买了个表4",
    "author" : "免提",
    "time" : "2015-6-17",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
},{
    "id" : 5,
    "category":5,
    "title" : "买了个表5",
    "author" : "米拉梯",
    "time" : "2015-4-17",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
},{
    "id" : 6,
    "category":6,
    "title" : "买了个表6",
    "author" : "拉米题",
    "time" : "2015-7-17",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
},{
    "id" : 7,
    "category":2,
    "title" : "买了个表7",
    "author" : "多雷米",
    "time" : "2015-8-17",
    "isNew" : "1",
    "isTop" : "1",
    "content" : "去年我买了个表，打算送给我最喜欢的人。转念一想，我他妈的到底最喜欢谁呢？想着想着，把表狠狠一摔，妈勒个逼，我谁也不喜欢"
}]
def getKnowledge(categoryId):
    knowledges = []
    for item in KNOWLEDGE:
        if(item["category"] == categoryId):
            knowledges.append(item)
    return knowledges
def getKnowledgeDetail(knowlledgeId):
    for item in KNOWLEDGE:
        if(item["id"] == knowlledgeId):
            return item
    return ""
    