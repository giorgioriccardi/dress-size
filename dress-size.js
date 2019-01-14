jQuery(document).ready(function($) {
    console.log("ready!");

	var modal = $("#sc-modal");
	$("#sc-open-modal").click(function(e){
		e.preventDefault();
		modal.show();
    refreshTable();
    createTableMobile();

	});
	
	$("#sc-close-modal").click(function(e){
		e.preventDefault();
		modal.hide();
  });
  
  $(document).keyup(function(e) {
    if (e.keyCode === 27) $('#sc-close-modal').click();   // esc
  });

    var sizes = [
      {"bodypart": "bust", "IN":[34,36,38,40], "CM": [86,91,96,102]},
      {"bodypart": "waist", "IN":[26,28,30,32], "CM": [66,71,76,81]},
      {"bodypart": "hips", "IN":[36.5,38.5,40.5, 42.5], "CM": [93,98,104,108]}
    ];

    var womanEmpty = $("#sc-woman-empty");
    var womanWaist = $("#sc-woman-waist");
    var womanBust = $("#sc-woman-bust");
    var womanHips = $("#sc-woman-hips");
    var sizeTableBody  = $("#sc-size-table-body");
	  var scPanel = $("#sc-panel");

    var unit = "IN";
    var unitLabels = {"IN":"in", "CM": "cm"};



    var unitToggle = $("#sc-unit-toggle");

    unitToggle.change(function() {
      console.log("c",this.checked);
      unit = this.checked?"CM":"IN";
      refreshTable();
    });

    var selectedSizeCell = null;
    var selectedImage = womanEmpty;

	
    var data_th = ['XS','S','M','L'];
    var refreshTable = function(){
      var tbody = "";
      for(var i=0; i<sizes.length;i++){
        tbody += '<tr  id="sc-row-'+sizes[i].bodypart+'"><td class="sc-bodypart-cell">'+sizes[i].bodypart+'</td>';
        for(var j=0; j<sizes[i][unit].length;j++)
          tbody += '<td data-th="'+data_th[j]+'" id="sc_cell_'+i+'_'+j+'">'+sizes[i][unit][j]+'</td>';
        tbody += ' </td></tr>';
      }

      sizeTableBody.html(tbody);
      $("#sc-row-waist").hover(function () {  selectedImage.hide(); womanWaist.show(); },
      function () { womanWaist.hide(); selectedImage.show(); });
      $("#sc-row-bust").hover(function () {  selectedImage.hide(); womanBust.show();},
        function () { womanBust.hide(); selectedImage.show(); });
      $("#sc-row-hips").hover(function () { selectedImage.hide(); womanHips.show();},
        function () { womanHips.hide();  selectedImage.show(); });

      selectedImage.css("height",scPanel.height() +"px");
      selectedImage.show();
      womanEmpty.css("height",scPanel.height() +"px");
      womanWaist.css("height",scPanel.height() +"px");
      womanBust.css("height",scPanel.height() +"px");
      womanHips.css("height",scPanel.height() +"px");
        $("#sc-size-table-body td").click(function(e){
          $("#sc-size-table-body td").each(function(){
            $(this).removeClass("size-selected");
          });
          $(this).addClass("size-selected");
          selectedSizeCell = $(this).attr("id");
    
          if(selectedSizeCell.startsWith("sc_cell_0"))
            selectedImage = womanBust;
          else if(selectedSizeCell.startsWith("sc_cell_1"))
            selectedImage = womanWaist;
          else if(selectedSizeCell.startsWith("sc_cell_2"))
            selectedImage = womanHips;
          else
			selectedImage = womanEmpty;
		
			selectedImage.css("height",scPanel.height() +"px");
		
          e.stopPropagation();
        });
    
      if(selectedSizeCell!=null)
       $("#"+selectedSizeCell).addClass("size-selected");

    };

    //refreshTable();
    var createTableMobile = function(){
      console.log("uunit", unit);
      var html = "";
 
      for(var i=0; i<sizes.length;i++){
        html += '<div class="sc-bodypart-panel">';
        html += '<div id="sc-bodypart-image-'+ sizes[i].bodypart +'"></div>';
        html += '<table id="sc-bodypart-table-'+ sizes[i].bodypart +'" class="sc-bodypart-table"><thead><tr>';
        html += '<th>'+ sizes[i].bodypart +'</th>';
        html += '<th class="sc-bodypart-unit"><div class="toggleWrapper"><input class="dn" type="checkbox"  bodypart="'+ sizes[i].bodypart +'" id="sc-unit-toggle-'+ sizes[i].bodypart +'"/>';
				html += '<label class="toggle" for="sc-unit-toggle-'+ sizes[i].bodypart +'"><span class="toggle__handler"></span></label></div></th>';
        html += '</tr></thead>';
        html += '<tbody id="sc-bodypart-tbody-'+ sizes[i].bodypart +'"></tbody>'
        html += '</table></div>';


      }
      $("#sc-panel-mobile").html(html);
      for(var i=0; i<sizes.length;i++){
        var unitToggle = $("#sc-unit-toggle-"+ sizes[i].bodypart);
        unitToggle.change(function() {
          console.log("c",this);
          createTableBodyMobile($(this).attr("bodypart"),  this.checked?"CM":"IN");
        });

        createTableBodyMobile(sizes[i].bodypart,unit);
      }
      for(var i=0; i<sizes.length;i++){
        var bodypartpanel_height = $('#sc-bodypart-table-'+ sizes[i].bodypart).height();
        var imgUrl = setting.pluginUrl + '/dress-size/assets/' + gen + '-' + sizes[i].bodypart +'.jpg';
        $("#sc-bodypart-image-"+ sizes[i].bodypart).html('<img style="height: '+bodypartpanel_height+'px" src="'+imgUrl+'" />');
      }
    };

    var createTableBodyMobile  = function(bodypart, bodyunit){
      console.log("createTableBodyMobile", bodyunit, bodypart);

      var tbody = "";
      for(var i=0; i<sizes.length;i++){
        if(sizes[i].bodypart == bodypart){
          for(var j=0; j<sizes[i][unit].length;j++)
            tbody += '<tr><td class="sc-bodypart-col-size">'+data_th[j]+'</td><td class="sc-bodypart-col-measure" id="sc_cell_'+i+'_'+j+'">'+sizes[i][bodyunit][j]+'</td></tr>';
        }
      }
      console.log("tbody",tbody);
      $('#sc-bodypart-tbody-'+bodypart).html(tbody);
    };



    var currentSize = "";
});