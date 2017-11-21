
( function () {

    'use strict';

  function webService($http) {
    
    var urlBase = 'http://editoraviva-ws-edtoraviva-ws-homolog.azurewebsites.net/api/';
    
    // HOMOLOG var urlBase = 'https://vivadireitows-homolog.azurewebsites.net/api/';

    var tokenApp = 'XkeknskmxKxk89X8xxJNK';

    return webService = {
      obterTermosDeUso: obterTermosDeUso,
      enviarPropostaEbook: enviarPropostaEbook,
      obterLoja : obterLoja
    }

    function obterLoja(params) {
      var strParams = JSON.stringify(params);
        return $http({
            url : urlBase + 'Prateleira/ObterPrateleira',
            method : "POST",
            data : strParams,
            contentType : "application/json",
            dataType : 'json',
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                tokenApp: tokenApp
            }
        }).success(function(response){
            
            if(response.Retorno.Codigo === 0){
                webService.prateleira = response.Produtos;
            }
            else
                console.log(response.Retorno.Mensagem);
            //https://www.npmjs.com/package/ng-alertify
        }).error(function(error){
            console.log(error);
        });
    }   

    function obterTermosDeUso() {
      return $http({
        url : urlBase + 'Portal/ObterTermoDeUso',
        method : "GET",
        contentType : "application/json",
        dataType : 'json',
        headers: {
          'Content-Type': "application/json; charset=utf-8",
          tokenApp: tokenApp,
          token: tokenSession
        }
      }).success(function(response){

        WebServiceNew.userTerms = response.TermoDeUso.descricao;
      }).error(function(error){
        console.log(error);
      });
    }    

    function enviarPropostaEbook(params) {
      var strParams = JSON.stringify(params);
      return $http({
        url : urlBase + 'FaleConosco/Adicionar',
        method : "POST",
        data : strParams,
        contentType : "application/json",
        dataType : 'json',
        headers: {
          'Content-Type': "application/json; charset=utf-8",
          tokenApp: tokenApp,
          token: tokenSession
        }
      }).success(function(response){
        if (response.Retorno.Codigo == 0){
          Alertify.success("Mensagem Enviada!!");
        } else{
          Alertify.error("Mensagem nÃ£o enviada por erro de servidor");
        }
      }).error(function(error){
        console.log(error);
      });
    }
  }

  angular
  .module('starter.controllers')
  .factory('webService', webService);

  webService.$inject = ['$http'];
} )();