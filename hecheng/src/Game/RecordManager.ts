class RecordManager
{
    private  maxlevel:number = 1;
    private static recordManager:RecordManager;
     public static getInstance()
    {
        if(RecordManager.recordManager == null)
        {
            RecordManager.recordManager = new RecordManager();
        }
        return RecordManager.recordManager;
    }
    public getMaxLevel()
    {
         let maxlevel = egret.localStorage.getItem("maxlevel");
        if(maxlevel == "" || maxlevel == null)
        {
            maxlevel = "0";//默认0关闭  1 为开启
        }
        return parseInt(maxlevel);
    }
    public setMaxLevel(maxlevel:number)
    {
          egret.localStorage.setItem("maxlevel",maxlevel.toString());
    }
    

}