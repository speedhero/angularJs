
/**
 * @description: url-reload directives 点击此url可重新加载 url, 主要用于左边菜单的url reload
 * @author: Patrick.he
 **/
angular.module('flymvo.urlReload.directives', [])
    .directive('urlReload', ['$location','$state',function( $location, $state){
        return function(scope, element, attrs) {
            element.bind('click',function(){
                if(element[0] && element[0].href && element[0].href === $location.absUrl()){
                    //http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state#methods_go
                    //$state.reload();
                    $state.go($state.current.name,{},{reload :true});
                }
            });
        };
    }]);