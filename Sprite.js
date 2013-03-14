function Sprite(w,sw,sy,sfile){
	function make_sprite(n,x,y,a,delay){
		if(typeof n=="object"){
			var delay=delay|500
			var curr=0,id=0,frames=[];
			var sprite=make_sprite(n[0],x,y,a)
			sprite.next_frame=function(){
				curr=(curr+1)%n.length;
				sprite.changeSprite(n[curr])
				id=setTimeout(sprite.next_frame,delay);
			}
			sprite.next_frame();
			return sprite;
		}
		x=x|0;
		y=y|0;
		var o=document.createElement("div");
		o.className="sprite"

		function set_n(pn){
			if(typeof n=="object"){
				frames=pn;
				n=frames[0];
				curr=0;
			} else {
				n=pn;
			}
		}

		function set_style(){
			var sx=n%sw,sy=~~(n/sw)
			o.style.cssText=
				"background:url('"+sfile+"');width:"+w+"px;height:"+w+"px;background-position:-"+sx*w+"px -"+sy*w+"px;position:absolute;top:"+y*w+"px;left:"+x*w+"px;opacity:"+a
		}
		o.changeSprite=function(pn){
			n=pn;
			set_style();
		}
		o.move=function(p,fn){
			if(typeof fn=="function"&&!fn([x+p[0],y+p[1]]))
				return false;
			x+=p[0];
			y+=p[1];
			set_style();
			return true;
		}
		o.collide=function(p){
			return o.dist(p)<1;
		}
		o.loc=function(){
			return [x,y];
		}
		o.dist=function(p){
			return Math.abs(x-p[0])+Math.abs(y-p[1])
		}
		set_style();
		return o;
	}
	return make_sprite;
}

function Map(sprite,map,map_width,terrain,map_obj){
	map_obj.add=function(o){
		map_obj.appendChild(o)
	}
	for(var i=0;i<map.length;i++)
		map_obj.add(sprite(terrain[map[i]].tile,i%map_width,~~(i/map_width),0.5));
		map_obj.check=function(p){
		var x=p[0],y=p[1]
			if((x>=0)&&(x<=map_width-1)&&(y<=map_width-1)&&(y>=0)){
				return terrain[map[x+y*map_width]].walkable;
			}
		return false
	}
	return map_obj;
}