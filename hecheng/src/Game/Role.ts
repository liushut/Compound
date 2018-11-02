class Role extends eui.Component {

    public constructor(num:number) {
        super();
        this.level  =  num;
    }
    protected childrenCreated() {
        super.childrenCreated();
        this.init(this.level);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }


    //人物图片
    public imgRole: eui.Image;
    //人物图片资源
    private roleStr: string;
    //人物收益    根据等级来
    private earnings: number;
    //人物等级
    public level: number;
    //金币钱数
    public textGlod: egret.TextField;



    //所属的土地
    private land: Land;
    //根据等级来生产不同图片
    private init(level: number) {
        this.changeImage(level);
        this.tweenRole();
        this.tweenText();
    }
    public changeImage(level: number) {
        switch(level)
        {
        case 1:
        this.imgRole.source = RES.getRes("");
        break;
         case 2:
        break;
         case 3:
        break;
         case 4:
        break;
         case 5:
        break;
         case 6:
        break;
         case 7:
        break;
         case 8:
        break;
         case 9:
        break;
         case 10:
        break;
         case 11:
        break;
         case 12:
        break;
         case 13:
        break;
         case 14:
        break;
         case 15:
        break;
         case 16:
        break;
         case 17:
        break;
         case 18:
        break;
         case 19:
        break;
         case 20:
        break;
         case 21:
        break;
         case 22:
        break;


        }
        
    }
    private tweenRole() {
        egret.Tween.get(this.imgRole).to({ scaleX: 1.2, scaleY: 1.2 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000).call(this.tweenRole, this);
    }
    private tweenText() {
        this.textGlod = new egret.TextField();
        this.textGlod.text = "500";
        egret.Tween.get(this.textGlod).to({ visible: true, y: this.imgRole.y * 1.5 }, 1000).wait(1000).to({ visible: false }).call(this.tweenText, this);
    }
    public setLand(land: Land) {
        this.land = land;
    }
    private onTouchBegin(e: egret.TouchEvent) {
        let point = new egret.Point(e.stageX, e.stageY);
        this.imgRole.x = point.x;
        this.imgRole.y = point.y;
    }
    private onTouchMove(e: egret.TouchEvent) {
        let point = new egret.Point(e.stageX, e.stageY);
        this.imgRole.x = point.x;
        this.imgRole.y = point.y;
    }
    private onTouchEnd(e: egret.TouchEvent) {
        let point = new egret.Point(e.stageX, e.stageY);
        this.imgRole.x = point.x;
        this.imgRole.y = point.y;
        for (let i = 0; i < GameScene.getInstance().groupLand.numChildren; i++) {
            let land: Land = <Land>GameScene.getInstance().groupLand.getChildAt(i);
            if (land.role != null) {
                let r = land.role;
                if (r.isSlefRect(point))//在这个角色区域，看是否是一样等级   一样则合并，不一样则交换
                {
                    if (this.level == r.level) {
                        r.level++
                        //产生新的  两个旧的废了  只需要更改图片OK 
                        this.mergeTween(land);
                        r.changeImage(r.level);
                        this.land.role = null;
                        break;

                    }
                    else 
                    {
                        //可以交换  也可以选择回去  先回去，交换后面有需求在做
                        

                    }
                }
            }
        }

    }
    //判断是否触摸点是否在自己区域
    public isSlefRect(point: egret.Point): boolean {
        if (point.x >= this.imgRole.x - this.imgRole.width / 2 && point.x <= this.imgRole.x + this.imgRole.width / 2 &&
            point.y >= this.imgRole.y - this.imgRole.height / 2 && point.y < this.imgRole.y + this.imgRole.height / 2) {
            console.log("在这个区域");
            return true;
        }
        else {
            return false;
        }
        //    return this.imgRole.hitTestPoint(point.x,point.y);
    }

    //合并动画
    public mergeTween(land: Land) {
        let img1: eui.Image = new eui.Image(this.roleStr);
        let img2: eui.Image = new eui.Image(this.roleStr);

        img1.x = this.imgRole.x + 100;
        img2.x = this.imgRole.x - 100;
        land.addChild(img1);
        land.addChild(img2);
        egret.Tween.get(img1).to({ x: this.imgRole.x }, 1000);
        egret.Tween.get(img2).to({ x: this.imgRole.x }, 1000).call(() => {
            land.removeChild(img1);
            land.removeChild(img2);

        })
    }
}