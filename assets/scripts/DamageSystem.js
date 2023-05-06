
/*START: DamageText*/
var imageType = "_0_"; // true = colored, false = white;
const damage_area = document.getElementById("damage_area");
damage_area.appendChild(document.createElement("p"));
const MAX_DAMAGE_COUNT = 5;

function addDamageText(attacker, defenser, attackerClan, defenserClan, tickCount)
{
    if(!damage_area) return;

    if(damage_area.childElementCount === MAX_DAMAGE_COUNT+1)
    {
		var elements = damage_area.getElementsByTagName('p');
		damage_area.removeChild(elements[1]);
    }

    function createDamageImage(tClan)
    {
        const clanImg = "UI_SYMBOL" + imageType + config.clans[tClan].code;
        var img = document.createElement("img");
        img.src = config.getImage(clanImg);
        img.style.width = "30px";
        img.style.height = "30px";
        return img;
    }
    function createDamageSpan(tText,tClan)
    {
        var span = document.createElement("span");
        if(tClan!=null)
            span.style.color = config.clans[tClan].color;
        span.innerHTML = tText;
        return span;
    }

    var p = document.createElement("p");
    p.className = "tagElement";
    p.tickCount = tickCount || new Date().getTime();
    //'<p class="tagElement">'+
    //createDamageImage(attackerClan)+
    //'    <span style="color: '+clans[attackerClan].color+'">'+attacker+'</span>'+
    //'    <span id="eventType" class="killed">Killed</span>'+    
    //createDamageImage(defenserClan)+
    //'    <span style="color: '+clans[defenserClan].color+'">'+defenser+'</span>'+
    //'</p>'
    //;
    
    var attackerImg = createDamageImage(attackerClan);
    var attackerSpan = createDamageSpan(attacker,attackerClan);

    var killedSpan = createDamageSpan("Killed");
    killedSpan.className = "killed";

    var defenserImg = createDamageImage(defenserClan);
    var defenserSpan = createDamageSpan(defenser,defenserClan);
    
    p.appendChild(attackerImg);
    p.appendChild(attackerSpan);
    p.appendChild(killedSpan);
    p.appendChild(defenserImg);
    p.appendChild(defenserSpan);

    damage_area.appendChild(p);
	startDamageTextLogic();
}

var iDamageTextLogic = null;
function checkDamageText()
{
	var childCount = damage_area.childElementCount;
	if(childCount <= 0)
		return;
	
	var elements = damage_area.getElementsByTagName('p');
    var tickCount = new Date().getTime();
	if(tickCount - elements[1].tickCount > 2000)
	{
		damage_area.removeChild(elements[1]);
	}
}
function startDamageTextLogic()
{
	if(iDamageTextLogic != null) return;
	iDamageTextLogic = setInterval( function() {
		checkDamageText();
	}, 500 );
}
/*END: DamageText*/


/*START: Skull Animation*/
var killer_skull = document.getElementById("killer_skull");
function SlowSkullAnimation() {
	var k = document.createElement("img");
	k.src = config.getImage("UI_ICON_KILL");
	killer_skull.appendChild(k);

    var op = 0.1;
    var increment = +0.1;
    k.style.opacity = 0;
    //k.style.display = 'inline';
	var kwidth = 105;
	var kheight = 110;
	//k.style.width = kwidth + "%";
	var wIncrement = 2;

    var timer = setInterval(function() {
	k.style.width = kwidth + wIncrement + "px";
	k.style.height = kheight + wIncrement + "px";
	kwidth++;
	kheight++;
        op += increment;
        k.style.opacity = op;
        if (op >= 1) increment = -increment;
        if (op <= 0) {
            k.style.display = 'none';
            clearInterval(timer); // end
        }
    }, 25);
}
/*END: Skull Animation*/


//For test
//setInterval( function() {
//    var m1 = parseInt(Math.random()*10000000000000).toString();
//    var m2 = parseInt(Math.random()*10000000000000).toString();
//    var c1 = parseInt(Math.random()*10)%4;
//    var c2 = parseInt(Math.random()*10)%4;
//    addDamageText("dos"+m1, "dos"+m2, c1, c2);
//}, 1000 );
addDamageText("dos156789123", "dos256789123", 0, 1);
addDamageText("dos1", "dos2", 1, 2);
addDamageText("dos3", "dos4", 2, 3);
addDamageText("dos5", "dos6", 3, 0);
addDamageText("dos7", "dos8", 3, 0);
addDamageText("dos7", "dos8", 3, 0);
setInterval( function(){
	SlowSkullAnimation();
}, 1000 );
