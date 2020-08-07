// ==UserScript==
// @name           SNAP
// @author         bajdai
// @updateURL      https://github.com/igorbajda/snap/raw/master/snap.user.js
// @downloadURL    https://github.com/igorbajda/snap/raw/master/snap.user.js
// @include        https://browse-query-editor-eu.aka.amazon.com/*
// @include        https://browse-query-editor-eu-dub.dub.proxy.amazon.com/*
// @include        https://browse-query-editor-na.aka.amazon.com/*
// @include        https://browse-query-editor-na.integ.amazon.com/*
// @version        1.0
// ==/UserScript==

//Adding  picture
document.querySelector("#redux-app > div > div.panel.panel-primary.asin-discovery-form > div.panel-collapse.collapse.in > div > div > div > div:nth-child(2) > div:nth-child(1) > div.col-xs-5").innerHTML = `
<div class="Button">
<div class="Snap"><button type="button">SNAP It!</button></div>
</div>
`
//Run Script
document.querySelector("#redux-app > div > div.panel.panel-primary.asin-discovery-form > div.panel-collapse.collapse.in > div > div > div > div:nth-child(2) > div:nth-child(1) > div.col-xs-5 > div > div > button").onclick = function() {
    var att = document.querySelector("#redux-app > div > div.asin-list-container > table > thead > tr").childElementCount;
    for (var z=4,zmax=att; z<zmax; z++){
        var test = document.querySelector("#redux-app > div > div.asin-list-container > table > thead > tr > th:nth-child("+z+")").textContent;
        var links = document.querySelectorAll("#redux-app > div > div.asin-list-container > table > tbody > tr > td.asin-list__cell.asin-list__cell--asin > a");
        var regex = /^(https?:\/\/csi\.amazon\.com\/view\?view\=)(blame\_o)(\&item\_)(id\=.{10})(\&marketplace_id\=\d+\&stage\=prod)/;
        for (var h=0,hmax=links.length; h<hmax; h++) {
            links[h].href = links[h].href.replace(regex,"$1simple_product_data_view$3$4$5");
        }
    }
    for (var x=1, xmax=att+1; x<xmax; x++){
        var nam = document.querySelector("#redux-app > div > div.asin-list-container > table > thead > tr > th:nth-child("+x+")").textContent
        var rows = document.querySelector("#redux-app > div > div.asin-list-container > table").rows.length
        //To check the attributes console.log(nam)
        for (var a=0,amax=rows; a<amax; a++){
            var tags = document.querySelectorAll("#redux-app > div > div.asin-list-container > table > tbody > tr:nth-child("+a+") > td:nth-child("+x+")");
            for (var i=0,imax=tags.length; i<imax; i++) {
                if (nam==='material' ||nam=== 'item_name'||nam==='material_composition'||nam==='fabric_type'||nam==='department'||nam==='size'||nam==='outer'||nam==='sole_material'||nam==='brand'||nam==='manufacturer'||nam==='product_description'){
                    var regextags = /^( { material:\[)?(\ \{\ language\_tag\:\w+\_\w*\,)(.*)(value\:\")(.*)(\"\ \})( ] })?/;
                    tags[i].textContent = tags[i].textContent.replace(regextags,"$5");
                }
                if (nam==='product_type'||nam==='binding'||nam==='gl_product_group_type'||nam==='batteries_included'||nam==='batteries_required'){
                    var regextags2 = /^(\ \{\ )(.*)(value\:)(.*)(\ \})/;
                    tags[i].textContent = tags[i].textContent.replace(regextags2,"$4");
                }
                if (nam==='bullet_point'||nam==='item_type_keyword'){
                    var child2 = document.querySelector("#redux-app > div > div.asin-list-container > table > tbody > tr:nth-child("+a+") > td:nth-child("+x+")").childElementCount
                    if (child2>0){
                        for (var d=0; d<10; d++){
                            var tags3 = document.querySelectorAll("#redux-app > div > div.asin-list-container > table > tbody > tr:nth-child("+a+") > td:nth-child("+x+") > ul > li:nth-child("+d+")");
                            var regextags3 = /^(\ \{\ )(.*)(value\:\")(.*)(\"\ \})/;
                            for (var i3=0,i3max=tags3.length; i3<i3max; i3++) {
                                tags3[i3].textContent = tags3[i3].textContent.replace(regextags3,"$4");
                            }
                        }
                    }
                    else{
                        var regextags9 = /^(\ \{\ )(.*)(value\:\")(.*)(\"\ \})/;
                        tags[i].textContent = tags[i].textContent.replace(regextags9,"$4");
                    }
                }
                if (nam==='item_weight'){
                    var regextags4 = /^(\ \{\ unit\:)(.*)(\,\ (normalized\_value\:)\{\ unit\:)(.*)(\,\ value)(.*)(\ \}\,\ value)(.*)(\ \})/;
                    tags[i].textContent = tags[i].textContent.replace(regextags4,"$2$9 $5$7");
                }
                if (nam==='item_package_weight'){
                    var regextags5 = /^(\ \{\ unit\:)(.*)(\,\ source\_customer\_id\:)(.*)(\,\ normalized\_value\:\{\ unit\:)(pounds)(, value\:)(.*)(\ \}\,\ value\:)(.*)( })/;
                    tags[i].textContent = tags[i].textContent.replace(regextags5,"$2:$10 $6:$8 CustomerID:$4");
                }
                if (nam==='item_package_dimensions'){
                    var regextags6 = /^( { )(length)(:{ unit:)(.*)(, normalized_value:{ unit:)(inches, value:)(.*)( }, value:)(.*)( }, )(width)(:{ unit:)(.*)(, normalized_value:{ unit:)(inches)(, value:)(.*)( }, value:)(.*)( }, source_customer_id:)(.*)(, )(height)(:{ unit:)(.*)(, normalized_value:{ unit:)(inches)(, value:)(.*)( }, value:)(.*)( } })/;
                    tags[i].textContent = tags[i].textContent.replace(regextags6,"$2:\n$4:$9\ninches:$7\n$11:\n$13:$19\ninches:$17\n$23:\n$25:$31\ninches:$29\nCustomerID:$21");
                }
                if (nam==='hazmat'){
                    var child = document.querySelector("#redux-app > div > div.asin-list-container > table > tbody > tr:nth-child("+a+") > td:nth-child("+x+")").childElementCount
                    if (child>0){
                        for (var l=0; l<25; l++){
                            var tags7 = document.querySelectorAll("#redux-app > div > div.asin-list-container > table > tbody > tr:nth-child("+a+") > td:nth-child("+x+") > ul > li:nth-child("+l+")");
                            var regextags7 = /^( { aspect:)(.*)(, value:")(.*)(" })/;
                            for (var i7=0,i7max=tags7.length; i7<i7max; i7++) {
                                tags7[i7].textContent = tags7[i7].textContent.replace(regextags7,"$2:$4");
                            }
                        }
                    }
                    else{
                        var regextags8 = /^( { aspect:)(.*)(, value:")(.*)(" })/;
                        tags[i].textContent = tags[i].textContent.replace(regextags8,"$2:$4");
                    }
                }
            }
        }
    }
}
