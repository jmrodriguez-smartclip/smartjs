import Promised from '../Promised';
import SMCPromise from '../SMCPromise';
class test extends Promised{
    initialize(dep)
    {
        this.timerPromise=SMCPromise();
        this.before("A").wait(dep.isInState("2A"));
        dep.waitFinished("2A").then(()=>{console.log("Desde Test2, veo que el estado 2A de Test, ha terminado")});
        this.before("B").wait(this.timerPromise);
        /* Lifecycle */
        this.run(["A","B"]);
    }

    onA(){
        console.log("EN A");
        setTimeout(()=>this.timerPromise.resolve(),3000);
    }
    onB(){console.log("EN B")};
}

class test2 extends Promised {
    initialize(dep)
    {
        this.startPromise=SMCPromise();
        this.before("2A").wait(this.startPromise);
        this.before("2B").wait(dep.isInState("B"));

        /* Lifecycle */
        test2I.run(["Start","2A","2B"]);
    }

    onStart(){
        console.log("Starting...")
        setTimeout(()=>{this.startPromise.resolve()},3000);
    }
    on2A(){console.log("EN 2A")}
    on2AFinished(){console.log("EN 2A Finished")}
    on2B(){console.log("En 2B")}
}

let testI = new test();
let test2I = new test2();
testI.initialize(test2I);
test2I.initialize(testI);

