
import { Table } from "@qtable/render";

const table = new Table(10,6,"container",[{startRow:1,startCol:1,endRow:2,endCol:2},{startRow:3,startCol:3,endRow:4,endCol:3}]);
table.initMaskTable()
.render();