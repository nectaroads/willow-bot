module.exports = {
    getIcon(index) {
        let icon;
        switch (parseInt(index)) {
            default: icon = "<:tile004:1147193817037017311>"; break;

            case 0: icon = "<:tile004:1147193817037017311>"; break;
            case 1: icon = "<:Wilson:1147193990731550881>"; break;
            case 2: icon = "<:Willow:1147193987262861453>"; break;
            case 3: icon = "<:Wolfgang:1147193996322541791>"; break;
            case 4: icon = "<:Wendy:1147193829355696138>"; break;

            case 5: icon = "<:Wx78:1147194009685594215>"; break;
            case 6: icon = "<:Wickerbottom:1147193833566773348>"; break;
            case 7: icon = "<:Woody:1147194000923705486>"; break;
            case 8: icon = "<:Wes:1147193830911770745>"; break;
            case 9: icon = "<:Maxwell:1147193812612026424>"; break;

            case 10: icon = "<:Wigfrid:1147193835273851001>"; break;
            case 11: icon = "<:Webber:1147193826323222670>"; break;
            case 12: icon = "<:Winona:1147193993193586708>"; break;
            case 13: icon = "<:Warly:1147193824536428628>"; break;
            case 14: icon = "<:Wortox:1147194005810061474>"; break;

            case 15: icon = "<:Wormwood:1147194003897458859>"; break;
            case 16: icon = "<:Wurt:1147194008460869724>"; break;
            case 17: icon = "<:Walter:1147193819763314748>"; break;
            case 18: icon = "<:Wanda:1147193821608812605>"; break;
            case 19: icon = "<:Wonkey:1147193999128531065>"; break;
        }

        return icon;
    },

    parseIconPrefabToIndex(string) {
        let index;
        switch (string) {
            case "null": index = 0; break;
            case "wilson": index = 1; break;
            case "willow": index = 2; break;
            case "wolfgang": index = 3; break;
            case "wendy": index = 4; break;

            case "wx78": index = 5; break;
            case "wickerbottom": index = 6; break;
            case "woody": index = 7; break;
            case "wes": index = 8; break;
            case "waxwell": index = 9; break;

            case "wathgrithr": index = 10; break;
            case "webber": index = 11; break;
            case "winona": index = 12; break;
            case "warly": index = 13; break;
            case "wortox": index = 14; break;

            case "wormwood": index = 15; break;
            case "wurt": index = 16; break;
            case "walter": index = 17; break;
            case "wanda": index = 18; break;
            case "wonkey": index = 19; break;
        }
        return index;
    },

    parseIconIndexToImage(index) {
        let icon;
        switch (index) {
            case 0: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147221476706103316/image.png"; break;
            case 1: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220399193604116/image9.png"; break;
            case 2: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220400066019338/i9mage.png"; break;
            case 3: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220385079775253/22image.png"; break;
            case 4: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220401957650442/imag6e.png"; break;
            case 5: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220400414130196/im2a3ge.png"; break;
            case 6: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220401575973065/ima8ge.png"; break;
            case 7: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220400816799805/im4a4ge.png"; break;
            case 8: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220402364502076/image7.png"; break;
            case 9: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220382965833859/1image.png"; break;
            case 10: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220384677109800/9image.png"; break;
            case 11: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220401219436694/im5age.png"; break;
            case 12: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220384282857482/8image.png"; break;
            case 13: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220399629795338/i4mage.png"; break;
            case 14: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220382558998538/1im4age.png"; break;
            case 15: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220382072455239/i4mag4e.png"; break;
            case 16: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220387604734072/i1m2ag3e.png"; break;
            case 17: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220383804702731/2image.png"; break;
            case 18: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220388015784036/i1mage.png"; break;
            case 19: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220388456189992/i3m3age.png"; break;
            default: icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147221476706103316/image.png"; break;
        }

        return icon;
    },

    parseIconPrefabToImage(prefab) {
        let icon;
        switch (prefab) {
            case "null": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147221476706103316/image.png"; break;
            case "wilson": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220399193604116/image9.png"; break;
            case "willow": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220400066019338/i9mage.png"; break;
            case "wolfgang": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220385079775253/22image.png"; break;
            case "wendy": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220401957650442/imag6e.png"; break;

            case "wx78": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220400414130196/im2a3ge.png"; break;
            case "wickerbottom": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220401575973065/ima8ge.png"; break;
            case "woody": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220400816799805/im4a4ge.png"; break;
            case "wes": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220402364502076/image7.png"; break;
            case "waxwell": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220382965833859/1image.png"; break;

            case "wathgrithr": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220384677109800/9image.png"; break;
            case "webber": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220401219436694/im5age.png"; break;
            case "winona": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220384282857482/8image.png"; break;
            case "warly": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220399629795338/i4mage.png"; break;
            case "wortox": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220382558998538/1im4age.png"; break;

            case "wormwood": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220382072455239/i4mag4e.png"; break;
            case "wurt": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220387604734072/i1m2ag3e.png"; break;
            case "walter": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220383804702731/2image.png"; break;
            case "wanda": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220388015784036/i1mage.png"; break;
            case "wonkey": icon = "https://cdn.discordapp.com/attachments/1143675145043587123/1147220388456189992/i3m3age.png"; break;
        }
    }
}