// $(function () {
// let gc=$('#gcmp3');
// console.log(gc)
function tanshi(){
    this.hezi=document.querySelector('.hezi');
    this.snake=['5_0','6_0','7_0'];
    this.flag = {'5_0':true,'6_0':true,'7_0':true};
    this.direction=40;
    this.gc=document.querySelector('#gcmp3');
    this.sd=document.querySelector('#sidiao');
    this.cdx=document.querySelector('#cdx');
    this.span=document.querySelector('span');
    this.spanT=this.span.innerText;

}
tanshi.prototype={
    tianjia:function(){
      this.xunhuan();
      this.dronsnke();
      this.move();
      this.keys();
      this.downfood();
    },
    xunhuan:function(){
        for(let i=0;i<20;i++){
            for(let j=0;j<20;j++){
                this.hezi.innerHTML+=`
                        
                        <div class="box" id="${i}_${j}"></div>`
            }
        }
    },
    dronsnke:function(){
        this.snake.forEach(element=>{
            document.getElementById(element).classList.add('hot');
        })
    },
    //添头去尾
    move:function(){
        let that=this;
        this.t=setInterval(function(){
            let oldt=that.snake[that.snake.length-1];
            // console.log(oldt);
            let arr = oldt.split('_');
            // console.log(arr);
            let mewt='';
            if(that.direction==40){
                newt=`${arr[0]*1+1}_${arr[1]}`

            }
            if(that.direction==38){
                newt=`${arr[0]*1-1}_${arr[1]}`

            }
            if(that.direction==37){
                newt=`${arr[0]}_${arr[1]*1-1}`

            }
            if(that.direction==39){
                newt=`${arr[0]}_${arr[1]*1+1}`

            }
            let arrs= newt.split('_');
            // console.log(arrs);
            if(arrs[0]<0 || arrs[0]>19){
                clearInterval(that.t);
                // alert('game over');
                that.gc.pause();
                that.sd.play();

            }
            if(arrs[1]<0 || arrs[1]>19){
                clearInterval(that.t);
                // alert('game over');
                that.gc.pause();
                that.sd.play();
            }
            if (that.flag[newt]){
                clearInterval(that.t);
                // alert('game over');
                that.gc.pause();
                that.sd.play();
            }
            if(newt==that.food){
                that.spanT++
                that.span.innerText=that.spanT;
                that.cdx.play()
                that.snake.push(newt);
                that.flag[newt]=true;
                document.getElementById(that.food).style.background='';
                that.downfood();
            }
                that.snake.push(newt);
            that.flag[newt]=true;
            let weiba = that.snake.shift();
            delete  that.flag[weiba];
            document.getElementById(weiba).classList.remove('hot');
            that.dronsnke();


        },200);
    },
    keys:function(){
        document.onkeydown = function(e){
            let keycode = e.keyCode;
            if(Math.abs(keycode-this.direction)==2){
                return ;
            }
            this.direction = keycode;
        }.bind(this);
    },
    downfood:function(){
        let x=Math.floor(Math.random()*20);
        let y=Math.floor(Math.random()*20);
        do{
            x=Math.floor(Math.random()*20);
            y=Math.floor(Math.random()*20);
        }while(this.flag[`${x}_${y}`])
        this.food=`${x}_${y}`
        document.getElementById(this.food).style.background='url("2.png") no-repeat center/cover';
        document.getElementById(this.food).style.borderRadius='50%'

    }
}



// })