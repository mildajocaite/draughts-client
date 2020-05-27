# Mokymosi ir mokymo žaisti šaškėmis sistemos prototipo kliento programinis kodas

Šioje repozitorijoje yra saugomas mokymosi ir mokymo žaisti šaškėmis sistemos prototipo kliento programinis kodas. Kitos susijusios repozitorijos:
- serverio programinis kodas „https://github.com/krismilda/draughts-server"
- „Arduino“ valdiklio programinis kodas „https://github.com/krismilda/iot-draughts-arduino“

Programos paleidimo instrukcijos:
- nusikopijuokite repozitoriją;
- įvykdykite komandą npm install arba yarn install;
- įvykdykite komandą npm start arba yarn start.

Norėdami prisijungti kaip treneris, naudokite šiuos prisijungimo duomenis:
- el. paštas: treneris@gmail.com
- slaptažodis: asd123

Norėdami prisijungti kaip mokinys, naudokite šiuos prisijungimo duomenis:
- el. paštas: mokinys@gmail.com
- slaptažodis: asd123

Pagrindinės mokymosi ir mokymo žaisti šaškėmis sistemos funkcijos:
<ul>
	<li><b>automatinis šaškių partijų įrašymas.</b> Mokiniams žaidžiant ant jutikliais papildytos šaškių lentos, padaryti ėjimai yra išsaugomi. Treneris ir žaidėjai gali peržiūrėti jau įrašytas partijas ar stebėti jas tiesiogiai žaidžiant. Tiesioginės transliacijos ir jau įrašytų partijų peržiūros pavyzdžiai pateikti žemiau
		<p align="center">
			<img src="https://github.com/krismilda/draughts-system-pictures/blob/master/tiesiogines_transliacijos.gif" height="280" />
      <img src="https://github.com/krismilda/draughts-system-pictures/blob/master/partiju_perziura.gif" height="280"/> 
		</div>
	</li>
	<li><b>uždavinių sukūrimas.</b> Treneris gali pridėti į sistemą uždavinius, kurie yra matomi visiems mokiniams, o mokiniai gali juos spręsti. Treneriui nebereikia kiekvienam mokiniui atskirai spausdinti uždavinių
		<p align="center">
			<img src="https://github.com/krismilda/draughts-system-pictures/blob/master/uzdavinio_sukurimas.gif" height="400" />
		</p>
	</li>
	<li><b>uždavinių sprendimas.</b> Mokiniai gali spręsti trenerio įkeltus uždavinius. Sprendimas yra automatiškai tikrinamas
		<p align="center">
			<img src="https://github.com/krismilda/draughts-system-pictures/blob/master/sprendimo_kurimas3.gif" height="500"/>
		</p>
	</li>
	<li><b>naujų naudotojų ir šaškių lentų pridėjimas į sistemą</b>
		<p align="center">
			<img src="https://github.com/krismilda/draughts-system-pictures/blob/master/lentos_kurimas.gif" height="280"/>
			<img src="https://github.com/krismilda/draughts-system-pictures/blob/master/naudotojo_kurimas.gif" height="280"/> 
		</p>
	</li>
	<li><b>statistikos peržiūra.</b> Treneris gali matyti įvairius statistinius duomenis. Žemiau pateiktas sąrašas mokinių, išrikiuotų mažėjančio išspręstų uždavinių kiekio tvarka
		<p align="center">
			<img src="https://github.com/krismilda/draughts-system-pictures/blob/master/statistika.PNG" height="310"/>
			</p>
	</li>
</ul>
