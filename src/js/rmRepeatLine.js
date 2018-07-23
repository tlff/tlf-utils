function isEqual(arr) {
    let a = arr.reduce((a, b) => {
        if (a && a === b) {
            return a;
        } else {
            return false;
        }
    })
    return a;
}
/**
 * 将两个有重叠部分的线段合成 成一个线段,如果没有重叠的部分原样返回
 * @param {Array} line1 直线1的端点坐标 eg: [x1,y1,x2,y2]
 * @param {Array} line2 直线2的端点坐标 eg: [x1,y1,x2,y2]
 * @returns {Array} 如果两个线段有重叠部分返回[[x3,y3,x3,y3]],两个线段没有重叠部分返回[[x1,y1,x2,y2],[x3,y3,x4,y4]]
 */
export function removeRepeatLine(line1, line2) {
    let ret;
    let [l1x1, l1y1, l1x2, l1y2] = line1;
    let [l2x1, l2y1, l2x2, l2y2] = line2;
    // let p1, p2, p3, p4;
    let a1, a2, b1, b2;

    //横线
    let w = isEqual([l1y1, l1y2, l2y1, l2y2]);
    //竖线
    let h = isEqual([l1x1, l1x2, l2x1, l2x2]);
    if (w===false && h===false) {
        a1 = (l1y2 - l1y1) / (l1x2 - l1x1);
        a2 = (l2y2 - l2y1) / (l2x2 - l2x1);
        b1 = l1y1 - a1 * l1x1;
        b2 = l2y1 - a2 * l2x1;
    }
    if ((a1 === a2 && b1 === b2) || w!==false || h!==false) {
        let l1, l2, c;
        if (h!==false) {
            l1 = [l1y1, l1y2];
            l2 = [l2y1, l2y2];
            c = y => [h,y];
        }else if(w!==false){
            l1 = [l1x1, l1x2];
            l2 = [l2x1, l2x2];
            c = y => [y,w];
        } else {
            l1 = [l1x1, l1x2];
            l2 = [l2x1, l2x2];
            c = x => [x, a1 * x + b1];
        }
        let l11 = {
            begin: Math.min(...l1),
            end: Math.max(...l1)
        }
        let l22 = {
            begin: Math.min(...l2),
            end: Math.max(...l2)
        }
        let min = Math.min(...l1, ...l2);
        let max = Math.max(...l1,...l2);
        if (l11.begin > l22.begin) {
            let tmp = l11;
            l11 = l22;
            l22 = tmp;
        }
        
        //分离
        if (l22.begin > l11.end) {
            ret = [
                [...c(l11.begin), ...c(l11.end)],
                [...c(l22.begin), ...c(l22.end)]
            ]
        } else {
            ret = [
                [...c(min), ...c(max)]
            ]
        }
    } else {
        ret = [[...line1], [...line2]]
    }
    return ret;
}