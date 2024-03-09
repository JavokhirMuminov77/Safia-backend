/*I - task*/

/*Buyeda matvh proportisi orqali arrayda string qiymat bor yuqliguini aniqlab oldik va join proportisi yordamida uni bush joyga tenglab oldik*/

function getDigits(input: string): string {
   const result = input.match(/\d+/g)?.join("");

   return result ? result : "";
   /*buyerda  shart operatori agar result teng bolsa result bolmasa  "" qaytar dedit*/
 }

 console.log(getDigits("m14i1t"));
/* .c  dssmkksd dfskmkmaskmx dwdew .s'/.d's;d's ddsd//s';.ds;'ldf.s ;sd

