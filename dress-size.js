jQuery(document).ready(function($) {
    console.log("ready!");
    var womanEmpty = $("#sc-woman-empty");
    var womanWaist = $("#sc-woman-waist");
    var womanBust = $("#sc-woman-bust");
    var womanHips = $("#sc-woman-hips");

    var steps = new Array();
    var stepsContent = new Array();
    var stepsHint = new Array();
    
    for( i=1; i<4; i++){
      steps.push($("#sc-size-calc-step-"+i));
      stepsContent.push($("#sc-size-calc-content-"+i));
      stepsHint.push($("#sc-size-calc-hint-"+i));
    }

    var stepsResultHint= $("#sc-size-calc-result-hint");
    var calcBodypart = {"sc-size-calc-bodypart-waist": $("#sc-size-calc-bodypart-waist"), 
    "sc-size-calc-bodypart-bust": $("#sc-size-calc-bodypart-bust"),
    "sc-size-calc-bodypart-hips": $("#sc-size-calc-bodypart-hips")};

    var calcBodypartSeparator =  $("#sc-size-calc-content-1 .select-separator");

    var calcUnit = {"sc-size-calc-unit-in": $("#sc-size-calc-unit-in"), 
    "sc-size-calc-unit-cm": $("#sc-size-calc-unit-cm")};
    var calcUnitSeparator =  $("#sc-size-calc-content-3 .select-separator");

    var calcInput = $("#sc-size-calc-measure-input");
    var calcResult = $("#sc-size-calc-result");

    $("#sc-row-waist").hover(function () { womanEmpty.hide(); womanWaist.show(); },
        function () { womanWaist.hide(); womanEmpty.show(); });
    $("#sc-row-bust").hover(function () { womanEmpty.hide(); womanBust.show();},
      function () { womanBust.hide(); womanEmpty.show(); });
    $("#sc-row-hips").hover(function () { womanEmpty.hide(); womanHips.show();},
      function () { womanHips.hide(); womanEmpty.show(); });

    for ( bodypart in calcBodypart) {
      if (calcBodypart.hasOwnProperty(bodypart)) {
          calcBodypart[bodypart].click(function(){selectBodypart($(this).attr("id"),$(this).attr("class") );});
      }
    }      

    for ( unit in calcUnit) {
      if (calcUnit.hasOwnProperty(unit)) {
          calcUnit[unit].click(function(){selectUnit($(this).attr("id"),$(this).attr("class") );});
      }
    }      

    calcInput.focusout(function(){goToCalcStep(2);});

    var selectBodypart = function(bodypartInput, clazz){
      console.log("selectBodypart",bodypartInput, clazz);
      if(clazz && !clazz.includes("selected")){
        for ( bodypart in calcBodypart) {
          if (calcBodypart.hasOwnProperty(bodypart)) {
            if(bodypart==bodypartInput){
              calcBodypart[bodypart].addClass('selected');
              calcBodypart[bodypart].removeClass('unselected');
            } 
            else{
              calcBodypart[bodypart].addClass('unselected');
              calcBodypart[bodypart].removeClass('selected');
            }
          }
          calcBodypartSeparator.addClass('unselected');
        }
      }
      else{

        for ( bodypart in calcBodypart) {
          if (calcBodypart.hasOwnProperty(bodypart)) {
            calcBodypart[bodypart].removeClass('unselected');
            calcBodypart[bodypart].removeClass('selected');
          }
        }
        calcBodypartSeparator.removeClass('unselected');
        calcBodypartSeparator.removeClass('selected');

      }


      womanWaist.hide();
      womanHips.hide();
      womanBust.hide();
      womanEmpty.hide(); 
      
      if(bodypartInput == 'sc-size-calc-bodypart-waist') {
        womanWaist.show();
      }
      else if(bodypartInput == 'sc-size-calc-bodypart-hips') {
         womanHips.show();
        }
      else if(bodypartInput == 'sc-size-calc-bodypart-bust') {
        womanBust.show();
      }
    
      goToCalcStep(1);
    };

    var selectUnit = function(unitInput, clazz){
      if(clazz && !clazz.includes("selected")){
        for ( unit in calcUnit) {
          if (calcUnit.hasOwnProperty(unit)) {
            if(unit==unitInput){
              calcUnit[unit].addClass('selected');
              calcUnit[unit].removeClass('unselected');
            } 
            else{
              calcUnit[unit].addClass('unselected');
              calcUnit[unit].removeClass('selected');
            }
          }
        }
        calcUnitSeparator.addClass('unselected');

      }
      else{

        for ( unit in calcUnit) {
          if (calcUnit.hasOwnProperty(unit)) {
            calcUnit[unit].removeClass('unselected');
            calcUnit[unit].removeClass('selected');
          }
        }
        calcUnitSeparator.removeClass('unselected');
        calcUnitSeparator.removeClass(' selected');
      }

      goToCalcStep(3);
    };
    
    var goToCalcStep = function(step){
      for ( i=0; i < 3; i++) {
        if(i==step){
          steps[i].addClass("active");
          stepsHint[i].show();
        }
        else{
          steps[i].removeClass("active");
          stepsHint[i].hide();
        }
      }
      if(step==1) {
        calcInput.focus();
      }

      calcSize();
    };

    var calcSize = function(){
      var bodypart = $("#sc-size-calc-content-1 .selected").text();
      var measure = calcInput.val();
      var unit = $("#sc-size-calc-content-3 .selected").text();
      console.log("calcSize",bodypart,measure,unit);

      if(bodypart && measure && unit){
        console.log("si");
        calcResult.text("L");
        stepsResultHint.show();
      }
      else{
        calcResult.text("");
        stepsResultHint.hide();
      }

    };

});