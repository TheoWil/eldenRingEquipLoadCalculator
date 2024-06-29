function calculateEquipLoad(eq_wt, eq_ld, ar_tl, er_tl, rt_bx) {
    var equip_weight = parseFloat(document.getElementById(eq_wt).value);
    var talisman_boost = 0.0;
    var required_max_weight;
    var raw_max_weight;
    var require_endurance;
    //console.log(typeof(equip_weight));
    //console.log(equip_weight);
    if(isNaN(equip_weight)){
        document.getElementById(rt_bx).innerHTML = "Make Sure you are only putting a number in \"Current Equipped Weight\"";
        return;
    }
    switch(document.getElementById(eq_ld).value){
        case "light":
            required_max_weight = equip_weight / 30 * 100;
            break;
        case "medium":
            required_max_weight = equip_weight / 70 * 100;
            break;
        case "heavy":
            required_max_weight = equip_weight + .1;
    }
    switch(document.getElementById(ar_tl).value){
        case "none":
            break;
        case "arsenal-charm":
            talisman_boost = talisman_boost + 15.0;
            break;
        case "arsenal-charm-1":
            talisman_boost = talisman_boost + 17.0;
            break;
        case "great-jar":
            talisman_boost = talisman_boost + 19.0;
    }
    switch(document.getElementById(er_tl).value){
        case "none":
            break;
        case "erdtree-favor":
            talisman_boost = talisman_boost + 5.0;
            break;
        case "erdtree-favor-1":
            talisman_boost = talisman_boost + 6.5;
            break;
        case "erdtree-favor-2":
            talisman_boost = talisman_boost + 8.0;
    }
    raw_max_weight = (required_max_weight / ((100 + talisman_boost)/100)).toFixed(1);
    document.getElementById(rt_bx).innerHTML = enduranceFromEquipload(raw_max_weight) + ", with a minimum Max Weight of: <span class=\"emphatic\">" + raw_max_weight +"</span> (Pre-Talismans)";
}
function enduranceFromEquipload(max_weight_needed){
    var text = "";
    var level;
    var m_w_n = max_weight_needed;
    if (max_weight_needed <= 45){
        level = 1;
    }
    else if(max_weight_needed <= 72){
        level = Math.ceil(parseFloat(((m_w_n - 45) / 27 * 17 + 8).toFixed(1)));
        //console.log(level);
    }
    else if(max_weight_needed <= 120){
        level = Math.ceil(parseFloat(((((m_w_n-72)/48)**(1/1.1))*35+25).toFixed(1)));
        //console.log(level);
    }
    else if(max_weight_needed <= 160){
        level = Math.ceil(parseFloat(((m_w_n - 120) / 40 * 39 + 60).toFixed(1)));
        //console.log(level);
    }
    else{
        text = "Impossible endurance requirment";
        return text;
    }
    text = "Minimum Endurance Required is: <span class=\"emphatic\">" + level + "</span>";
    return text;
}
