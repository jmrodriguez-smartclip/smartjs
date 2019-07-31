import DivNode from "./DivNode";
import * as Compat from "../../../Browser/CrossCompat"

export default class PlaceHolder extends DivNode {
    constructor(source, config) {
        let divConfig={
            tag:"div"
        };
        super(divConfig);
        let srcDiv=source.getNode();
        srcDiv.getNode().parentNode.insertBefore(this.getNode(),srcDiv.getNode());
        this.addClass("SMCGhost");
        this.source=source;
        this.config=config;

    }

    create() {
        let sourceProperties=this.source.getNode().getPositionalProperties();
        let box=Compat.getElementCoordinates(this.source.getNode().getNode());
        let percent=(this.config.heightPercent===undefined?100:this.config.heightPercent)/100;
        sourceProperties.width=box.width+"px";
        sourceProperties.height=parseInt(box.height*percent)+"px";

        this.applyStyles(sourceProperties);
    }
}





