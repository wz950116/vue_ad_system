var $$domain = require('./config.js').domain;
var request = require('lib-request');
request.pushWhiteList($$domain + '/user/info/header', 'msg');
request.pushWhiteList($$domain + '/demander/info/header', 'msg');
request.pushWhiteList($$domain + '/message/getMessageNum', 'msg');
request.pushWhiteList($$domain + '/spreading/getAdPlanInfo', 'data.desc');
request.pushWhiteList($$domain.businessDomain, 'data.[].circleBounds');
request.pushWhiteList($$domain + '/headPage/agent/getChildGuestDetail', 'data.plan_list.[].cost.planDesc');
request.pushWhiteList($$domain + '/spreadManage/getEstateListAndPosLimit', 'data.posInfo.file_restrain');


var map = {
    'getHeaderInfo': require('./data/proxy/getHeaderInfo.js'),
    'getCreditInfo': require('./data/proxy/getCreditInfo.js'),
    'getCreditShow': require('./data/proxy/getCreditShow.js'),
    'getTaskInfo': require('./data/proxy/getTaskInfo.js'),
    'setRepayment': require('./data/proxy/setRepayment.js'),
    'getDemanderStatis': require('./data/proxy/getDemanderStatis.js'),
    'getMessageList': require('./data/proxy/getMessageList.js'),
    'getDemanderInfo': require('./data/proxy/getDemanderInfo.js'),
    'getCustomerInfo': require('./data/proxy/getCustomerInfo.js'),
    'deleteMessage': require('./data/proxy/deleteMessage.js'),
    'getAdPlanList': require('./data/proxy/getAdPlanList.js'),
    'getAdPlanInfo': require('./data/proxy/getAdPlanInfo.js'),
    'createAdPlan': require('./data/proxy/createAdPlan.js'),
    'editAdPlanInfo': require('./data/proxy/editAdPlanInfo.js'),
    'searchAdPlans': require('./data/proxy/searchAdPlans.js'),
    'deleteAdPlan': require('./data/proxy/deleteCurrentAdPlan.js'),
    'searchAdUnits': require('./data/proxy/searchAdUnits.js'),
    'searchAdIdeas': require('./data/proxy/searchAdIdeas.js'),
    'getAdUnitInfo': require('./data/proxy/getAdUnitInfo.js'),
    'createAdIdea': require('./data/proxy/createAdIdea.js'),
    'deleteAdUnit': require('./data/proxy/deleteAdUnit.js'),
    'deleteAdIdeas': require('./data/proxy/deleteAdIdeas.js'),
    'exportIdeaList': require('./data/proxy/exportIdeaList.js'),
    'exportUnitList': require('./data/proxy/exportUnitList.js'),
    'exportPlanList': require('./data/proxy/exportPlanList.js'),
    'editAdUnitInfo': require('./data/proxy/editAdUnitInfo.js'),
    'uploadIdeaImage': require('./data/proxy/uploadIdeaImage.js'),
    'getDemanderLoupanList': require('./data/proxy/getDemanderLoupanList.js'),
    'setAdIdeaReleaseStatus': require('./data/proxy/setAdIdeaReleaseStatus.js'),
    'searchAdResource': require('./data/proxy/searchAdResource.js'),
    'getInitAdResourceSelect': require('./data/proxy/getInitAdResourceSelect.js'),
    'verifyCurrentPlan': require('./data/proxy/verifyCurrentPlan.js'),
    'clearCurrentResource': require('./data/proxy/clearCurrentResource.js'),
    'getFirstLevelProgamas': require('./data/proxy/getFirstLevelProgamas.js'),
    'getSecondLevelProgamas': require('./data/proxy/getSecondLevelProgamas.js'),
    'getScreenIndice': require('./data/proxy/getScreenIndice.js'),
    'addAdResource': require('./data/proxy/addAdResource.js'),
    'logout': require('./data/proxy/logout.js'),
    'cancelDistribution': require('./data/proxy/cancelDistribution.js'),
    'getChildPlanList': require('./data/proxy/getChildPlanList.js'),
    'getChildGuestList': require('./data/proxy/getChildGuestList.js'),
    'releaseAdResource': require('./data/proxy/releaseAdResource.js'),
    'cancelPayedOrder': require('./data/proxy/cancelPayedOrder.js'),
    'getPayedAdResourceList': require('./data/proxy/getPayedAdResourceList.js'),
    'delAdResource': require('./data/proxy/delAdResource.js'),
    'getPayResult': require('./data/proxy/getPayResult.js'),
    'pay': require('./data/proxy/pay.js'),
    'getPayAuthCode': require('./data/proxy/getPayAuthCode.js'),
    'createAdUnit': require('./data/proxy/createAdUnit.js'),
    'getAdResourceList': require('./data/proxy/getAdResourceList.js'),
    'getAgentInfo': require('./data/proxy/getAgentInfo.js'),
    'getSubDemanderList': require('./data/proxy/getSubDemanderList.js'),
    'searchSubDemanders': require('./data/proxy/searchSubDemanders.js'),
    'getSubDemanderInfo': require('./data/proxy/getSubDemanderInfo.js'),
    'createSubDemander': require('./data/proxy/createSubDemander.js'),
    'editSubCustomer': require('./data/proxy/editSubCustomer.js'),
    'viewSubCustomer': require('./data/proxy/viewSubCustomer.js'),
    'getAdResourceDetail': require('./data/proxy/getAdResourceDetail.js'),
    'getAccountInfo': require('./data/proxy/getAccountInfo.js'),
    'setContactInfo': require('./data/proxy/setContactInfo.js'),
    'addPromotionCode': require('./data/proxy/addPromotionCode.js'),
    'reUpdateAccountInfo': require('./data/proxy/reUpdateAccountInfo.js'),
    'province': require('./data/proxy/province.js'),
    'city': require('./data/proxy/city.js'),
    'getNoticeContactList': require('./data/proxy/getNoticeContactList.js'),
    'deleteNoticeEmail': require('./data/proxy/deleteNoticeEmail.js'),
    'deleteNoticeMobile': require('./data/proxy/deleteNoticeMobile.js'),
    'addNoticeEmail': require('./data/proxy/addNoticeEmail.js'),
    'addNoticeMobile': require('./data/proxy/addNoticeMobile.js'),
    'getSmsCheckCode': require('./data/proxy/getSmsCheckCode.js'),
    'setNoticeStyle': require('./data/proxy/setNoticeStyle.js'),
    'getQualificationList': require('./data/proxy/getQualificationList.js'),
    'deleteQualification': require('./data/proxy/deleteQualification.js'),
    'uploadQualificationPic': require('./data/proxy/uploadQualificationPic.js'),
    'getFinanceOverviewInfo': require('./data/proxy/getFinanceOverviewInfo.js'),
    'setFinanceRecharge': require('./data/proxy/setFinanceRecharge.js'),
    'getFinanceDetailList': require('./data/proxy/getFinanceDetailList.js'),
    'getFananceInvoiceList': require('./data/proxy/getFananceInvoiceList.js'),
    'setInvoiceInfo': require('./data/proxy/setInvoiceInfo.js'),
    'getLastInvoiceInfo': require('./data/proxy/getLastInvoiceInfo.js'),
    'setTaxManInfo': require('./data/proxy/setTaxManInfo.js'),
    'searchEstate': require('./data/proxy/searchEstate.js'),
    'addQualification': require('./data/proxy/addQualification.js'),
    'submitCheck': require('./data/proxy/submitCheck.js'),
    'submitClue': require('./data/proxy/submitClue.js'),
    'getEstateList': require('./data/proxy/getEstateList.js'),
    'xian': require('./data/proxy/xian.js'),
    'business': require('./data/proxy/business.js'),
    'submitAccInfo': require('./data/proxy/submitAccInfo.js'),
    'clearSession': require('./data/proxy/clearSession.js'),
    'getLoginInfo': require('./data/proxy/getLoginInfo.js'),
    'getInvoiceCount': require('./data/proxy/getInvoiceCount.js'),
    'sendQuotaVerification': require('./data/proxy/sendQuotaVerification.js'),
    'addQuotaConfirm': require('./data/proxy/addQuotaConfirm.js'),
    'getCustomerAccount': require('./data/proxy/getCustomerAccount.js'),
    'sendCustomerVerification': require('./data/proxy/sendCustomerVerification.js'),
    'addSubConfirm': require('./data/proxy/addSubConfirm.js'),
    'getChargeResult': require('./data/proxy/getChargeResult.js'),
    'addCollaborator': require('./data/proxy/addCollaborator.js'),
    'getList': require('./data/proxy/getList.js'),
    'accept': require('./data/proxy/accept.js'),
    'confirmAuth': require('./data/proxy/confirmAuth.js'),
    'del': require('./data/proxy/del.js'),
    'getMessageNum': require('./data/proxy/getMessageNum.js'),
    'getCityIndex': require('./data/proxy/getCityIndex.js'),
    'getOrderExcel': require('./data/proxy/getOrderExcel.js'),
    'getChildInfoInExcel': require('./data/proxy/getChildInfoInExcel.js'),
    'getChildInfo': require('./data/proxy/getChildInfo.js'),
    'getOrderIdeasToUpload': require('./data/proxy/getOrderIdeasToUpload.js'),
    'getSearchResult': require('./data/proxy/getSearchResult.js'),
    'dayByDay': require('./data/proxy/dayByDay.js'),
    'getChildDetail': require('./data/proxy/getChildDetail.js'),
    'isDemanderWhiteList': require('./data/proxy/isDemanderWhiteList.js')
};


var req = function(url, params, fn) {
    var key = url.match(/\/api\/(.*)\.json/)[1];
    var proxy = map[key];
    typeof proxy === 'function' && proxy(params, fn);
};


module.exports = req;
