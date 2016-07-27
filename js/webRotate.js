function WebRotate(option){
    this.init(option);
}

WebRotate.prototype={
    construtor:WebRotate,
    init:function(option){
        this.x=option.x;
        this.y=option.y;
        this.innerRadius=option.innerRadius;
        this.outerRadius=option.outerRadius;
        this.innerColor=option.innerColor;
        this.outerColor=option.outerColor;
        this.fontSize=option.fontSize;
        this.fontFamily=option.fontFamily;
        this.text=option.text;
        this.opacity=option.opacity;
        this.secondAngle=option.secondAngle;

        var _this=this;
        this.group=new Konva.Group({
            x:0,
            y:0
        });

        //绘制小圆
        var circle=new Konva.Circle({
            x: _this.x,
            y: _this.y,
            radius: _this.innerRadius,
            fill: _this.innerColor,
            opacity:_this.opacity
        });

        //绘制小圆阴影
        var ring=new Konva.Ring({
            x: _this.x,
            y: _this.y,
            innerRadius: _this.innerRadius,
            outerRadius: _this.outerRadius,
            fill:_this.outerColor
        });

        //绘制小圆文字
        var text=new Konva.Text({
            x:_this.x - _this.innerRadius,
            y:_this.y - 1 / 2 * _this.fontSize,
            text:_this.text,
            width:_this.innerRadius * 2,
            align:'center',
            fontSize:_this.fontSize,
            fontFamily:_this.fontFamily,
            fill:'white',
            strokeWidth:1
        });

        //加图型和文字添加到group中
        this.group.add(circle);
        this.group.add(ring);
        this.group.add(text);
    },

    addToGroupOrLayer:function(layer){
        layer.add(this.group);
    }
}