function Sprite(w,sw,sy,sfile){
	function make_sprite(n,x,y,a){
		x=x|0;
		y=y|0;
		var o=document.createElement("div");
		o.className="sprite"

		function set_style(){
			var sx=n%sw,sy=~~(n/sw)
			o.setAttribute("style","background:url('"+sfile+"');width:"+w+"px;height:"+w+"px;background-position:-"+sx*w+"px -"+sy*w+"px;position:absolute;top:"+y*w+"px;left:"+x*w+"px;opacity:"+a)
		}
		o.changeSprite=function(pn){
			n=pn;
			set_style();
		}
		o.move=function(px,py){
			x+=px;
			y+=py;
			set_style();
		}

		set_style();
		return o;
	}
	return make_sprite;
}