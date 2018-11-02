class ShopLayer extends eui.Component{
    constructor()
    {
        super();
    }
    protected childrenCreated()
    {
        super.childrenCreated();
        this.init();

    }
    private shopList:eui.List;
    private shopScoller:eui.Scroller;
    private init()
    {
        let listJson: Array<Object> = [
        { icon: "xxx.png", name: "", btnLabel: "",btnImage:"xxx.png",level:1 },
        { icon: "xxx.png", name: "", btnLabel: "",btnImage:"xxx.png",level:1 },
        { icon: "xxx.png", name: "", btnLabel: "",btnImage:"xxx.png",level:1 },
        { icon: "xxx.png", name: "", btnLabel: "",btnImage:"xxx.png" ,level:1},
        { icon: "xxx.png", name: "", btnLabel: "",btnImage:"xxx.png",level:1 }] 
        this.shopList.dataProvider = new eui.ArrayCollection(listJson);//数据源
        this.shopList.itemRenderer = ShopLayer;
    }
}

class ShopListSkin extends eui.ItemRenderer{
    constructor()
    {
        super();
    }
    private btnBuy:eui.Button;//购买的按钮
    private level:number;//要买的东西的等级
    private imgNormal:eui.Image;
    private imgUnnormal:eui.Image;
    protected childrenCreated()
    {
        super.childrenCreated();
        this.init();
        this.btnBuy.addEventListener(egret.Event.CHANGE,this.onBuy,this);
        this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuy,this);

    }

    private init()//将所有的图片先把影子放正常的上面，小于的在正常显示。
    {
        if(this.data.level < GameScene.getInstance().maxLevel)
        {
            this.imgNormal.visible = true;
        }
    }
    private onBuy()
    {
        GameScene.getInstance().addRole(this.data.level);//买对应级数的物品
    }
    protected dataChanged():void
    {
        console.log("the data level",this.data.level);
    }

}