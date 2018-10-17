import ConditionalConfig from "../ConditionalConfig"

let c=new ConditionalConfig(
    {
        a:1,
        b:{cond:{
            expr:"x.y==2",
                onTrue:{
                    z:4,
                    r:{
                        cond:{
                            expr:"c.v==4",
                            onTrue:{
                                vv:6
                            },
                            onFalse:{
                                vv:18
                            }
                        }
                    }
                },
                onFalse:1
            }
        }
    },

    {
        x:{y:2},c:{v:4}
    }
);
console.dir(c.parse());