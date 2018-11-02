class GameScene extends eui.Component {
    public constructor() {
        super();
    }

    protected childrenCreated() {
        super.childrenCreated();
        this.addButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addRole,this);
      
    }
    private  static gameScene:GameScene;
    public static getInstance()
    {
        if(GameScene.gameScene == null)
        {
            GameScene.gameScene = new GameScene();
        }
        return GameScene.gameScene;
    }
    //土地中最高等级
    public maxLevel:number = 1;
    //土地group
    public groupLand: eui.Group;
    //添加人物的按钮
    private addButton:eui.Button;
    private initMap()
    {
        this.groupLand.removeChildren();
        for(let i = 0 ;i < 12; i++)
        {
            let land = new Land();
            this.groupLand.addChild(land);
        }
    }
    public addRole(num:number)
    {
        let isFull:number = 0;
        let land:Land = null;
        for(let i = 0;i < 12 ;i ++)
        {
            let temp = <Land>this.groupLand.getChildAt(i);
            if(temp.role == null)
            {
                land = temp;
                break;
            }
          else if(temp.role != null)
            {
                isFull ++;
            }            
        }
        if(isFull >= 11)
        {
            console.log("已经满了，请删除");
        }

       if(land != null)
       {
           let role = new Role(num);
        //    role.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        //    role.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        //    role.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
           this.addChild(role);
           land.setRole(role);
           role.setLand(land);
       }
    }
    private onTouchBegin(e:egret.TouchEvent)
    {
        let point:egret.Point = new egret.Point(e.stageX,e.stageY);
        let curImg = e.currentTarget.imgRole;
        curImg.x = point.x;
        curImg.y = point.y;
    }
    private onTouchMove(e:egret.TouchEvent)
    {
        let point:egret.Point = new egret.Point(e.stageX,e.stageY);
        let curImg = e.currentTarget.imgRole;
        curImg.x = point.x;
        curImg.y = point.y;
    }
    private onTouchEnd(e:egret.TouchEvent)
    {
        let point:egret.Point = new egret.Point(e.stageX,e.stageY);
        let curImg = e.currentTarget.imgRole;
        curImg.x = point.x;
        curImg.y = point.y;
        for(let i = 0;i < this.groupLand.numChildren;i++)
        {
            let land:Land = <Land>this.groupLand.getChildAt(i);
            if(land.role != null)
            {
                if (land.role.isSlefRect(point)) {
                    if (land.role.level == e.currentTarget.level)//目标图片与现在的图片
                    {
                        land.role.level++;
                        land.role.mergeTween(land);
                        land.role.changeImage(land.role.level);
                        this.removeChild(e.currentTarget);
                        e.currentTarget.land.role = null;

                        if(land.role.level > RecordManager.getInstance().getMaxLevel())
                        {
                            RecordManager.getInstance().setMaxLevel(land.role.level);//存储新的进度
                            //解锁新界面

                        }
                    }
                    else {
                        curImg.x = land.x;
                        curImg.y = land.y - 200;
                    }
                }
            }
         
        }
    }
}