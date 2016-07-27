function Histogram(option){
    this.init(option);
}

Histogram.prototype={
    construtor:Histogram,
    init:function(option){
        this.x=option.x;
        this.y=option.y;
        this.maxWidth=option.maxWidth;
        this.maxHeight=option.maxHeight;
        this.data=option.data;
        this.length=this.maxWidth / this.data.length;

        var _this=this;
        this.group=new Konva.Group({
            x:_this.x,
            y:_this.y
        });

        //绘制柱状图的底线
        var line=new Konva.Line({
            points:[0,0,_this.maxWidth,0],
            stroke:"skyblue",
            strokeWidth:1
        });
        this.group.add(line);
        //遍历data数据，渲染柱状图
        for(var i=0;i<this.data.length;i++){
            //渲染柱状图
            var rect=new Konva.Rect({
                x: (i + 1 / 4) * _this.length,
                // y:-_this.data[i].value * _this.maxHeight,
                y: 0,
                width: 1 / 2 * _this.length,
                // height: _this.data[i].value * _this.maxHeight,
                height:0,
                fill: _this.data[i].color,
                shadowColor: '#ccc',
                shadowBlur: 15,
                cornerRadius:8
            });
            //绘制柱状图上方的文字
            var textTop=new Konva.Text({
                x: i * _this.length,
                y: -20,
                // y:-_this.data[i].value * _this.maxHeight - 20,
                width:_this.length,
                align:'center',
                text: _this.data[i].value * 100 + '%',
                fontSize: 18,
                fontFamily: 'Calibri',
                fill: _this.data[i].color,
                name: 'textTop'
            });
            //绘制柱状图下方的文字
            var textBottom=new Konva.Text({
                x: (i + 1 / 4) * _this.length,
                y: 0,
                width:1 / 2 * _this.length,
                align:'center',
                text: _this.data[i].name,
                fontSize: 18,
                fontFamily: 'Calibri',
                fill: _this.data[i].color,
                name: 'textBottom',
                rotation: 10
            });
            _this.group.add(rect);
            _this.group.add(textTop);
            _this.group.add(textBottom);
        }
    },
    addToGroupOrLayer:function(layer){
        layer.add(this.group);
    },
    moveTo:function(){
        var _this=this;
        this.group.find('Rect').each(function(item,index){
            var Tween=new Konva.Tween({
                node: item,
                duration: 1,
                y:-_this.data[index].value * _this.maxHeight,
                height: _this.data[index].value * _this.maxHeight
            });
            Tween.play();
        });
        this.group.find('.textTop').each(function(item,index){
            var textTween=new Konva.Tween({
                node:item,
                duration: 1,
                y: -_this.data[index].value * _this.maxHeight - 20
            });
            textTween.play();
        });
    }
}