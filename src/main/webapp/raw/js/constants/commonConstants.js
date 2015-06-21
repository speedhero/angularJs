/**
 * @description: 导航 constants
 * @author: Patrick.he
 **/
angular.module('flymvo.common.constants', [])
    .constant('commonConstants', {

        'imageUploadPath' : '/data/upload/image'
    })
    .factory('hourOptions',function(){
        var hourOptions = [];
        for(var i=0; i<24; i++){
            var h = (i<10)?"0"+i :""+i;
            hourOptions.push(h+":00:00");
        }
        return hourOptions;
    })

;
