class Land extends eui.Component{
     public constructor()
    {
        super();
    }

     protected childrenCreated()
    {
        super.childrenCreated();
    }
    //位置上的人物
    public role:Role = null;
    //土地图片
    private imgLand:eui.Image;
    public setRole(role:Role)
    {
        this.role = role;
        this.role.x = this.stage.stageWidth / 2;
        this.role.y = this.stage.stageHeight + 10;
        
        egret.Tween.get(this.role).to({x:this.imgLand.x,y:this.imgLand.y - 20},1000);
    }
    public removeRole()
    {
        this.role = null;
    }
   
}