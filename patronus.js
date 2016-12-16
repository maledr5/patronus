$( document ).ready(function(){
	var FUERZA ='fuerza'
	var TRABAJODURO ='trabajo duro'
	var AVENTURA ='aventura'
	var AMABILIDAD  ='amabilidad '
	var SABIDURIA ='sabiduría'
	var ASTUCIA ='astucia'
	var AMBICION ='ambición'
	var DETERMINACION ='determinación'
	var JUSTICIA ='justicia'
	var EQUIDAD ='equidad'
	var AMISTAD ='amistad'
	var VALOR ='valor'
	var INSTINTODECONSERVACION ='instinto de conservación'
	var DEDICACION ='dedicación'
	var CREATIVIDAD ='creatividad'
	var FIDELIDAD ='fidelidad'
	var INTELIGENCIA ='inteligencia'
	var TOLERANCIA ='tolerancia'
	var CORRER ='correr'
	var SALTAR ='saltar'
	var OBSERVAR ='observar'
	var COMER ='comer'
	var HABLAR ='hablar'
	var PENSAR ='pensar'
	var ESCUCHAR ='escuchar'
	var LEER ='leer'
	var JUGAR ='jugar'
	var BOSQUE ='bosque'
	var MAR ='mar'
	var MONTAÑAS ='montañas'
	var DESIERTO ='desierto'

	var animales = ['oso de anteojos', 'ocelote', 'condor', 'llama', 'venado', 'capybara', 'buho', 'serpiente']	

	treats = {}
	treats[FUERZA] = ['oso de anteojos', 'ocelote']
	treats[TRABAJODURO] = ['condor', 'llama']
	treats[AVENTURA] = ['venado', 'capybara']
	treats[AMABILIDAD ] = ['llama', 'capybara']
	treats[SABIDURIA] = ['buho', 'condor']
	treats[ASTUCIA] = ['serpiente', 'ocelote']
	treats[AMBICION] = ['serpiente', 'ocelote']
	treats[DETERMINACION] = ['llama', 'buho']
	treats[JUSTICIA] = ['oso de anteojos', 'condor']
	treats[EQUIDAD] = ['capybara', 'buho']
	treats[AMISTAD] = ['oso de anteojos', 'venado']
	treats[VALOR] = ['ocelote', 'serpiente']
	treats[INSTINTODECONSERVACION] = ['Capybara', 'serpiente']
	treats[DEDICACION] = ['buho', 'condor']
	treats[CREATIVIDAD] = ['venado', 'oso de anteojos']
	treats[FIDELIDAD] = ['oso de anteojos', 'llama']
	treats[INTELIGENCIA] = ['serpiente', 'buho']
	treats[TOLERANCIA] = ['capybara', 'ocelote']
	treats[CORRER] = ['ocelote', 'llama']
	treats[SALTAR] = ['venado', 'oso de anteojos']
	treats[OBSERVAR] = ['buho', 'condor']
	treats[COMER] = ['capybara', 'llama']
	treats[HABLAR] = ['ocelote', 'venado']
	treats[PENSAR] = ['buho', 'condor']
	treats[ESCUCHAR] = ['oso de anteojos', 'llama']
	treats[LEER] = ['serpiente', 'condor']
	treats[JUGAR] = ['venado', 'capybara']
	treats[BOSQUE] = ['oso de anteojos', 'capybara']
	treats[MAR] = ['ocelote', 'buho']
	treats[MONTAÑAS] = ['llama', 'condor']
	treats[DESIERTO] = ['serpiente', 'venado']

	preguntas = [
		[FUERZA, TRABAJODURO, AVENTURA],
		[AMABILIDAD, SABIDURIA, ASTUCIA],
		[AMBICION, DETERMINACION, JUSTICIA],
		[EQUIDAD, AMISTAD , VALOR],
		[INSTINTODECONSERVACION, DEDICACION, CREATIVIDAD],
		[FIDELIDAD, INTELIGENCIA, TOLERANCIA],
		[CORRER, SALTAR, OBSERVAR],
		[COMER, HABLAR, PENSAR],
		[ESCUCHAR, LEER, JUGAR],
		[BOSQUE, MAR],
		[MONTAÑAS, DESIERTO]
	]

	var cantidadesDisponibles = {};
	
	function totalDisponibilidad(){
		var total = 0;
		for (key in cantidadesDisponibles) {
			total = total + cantidadesDisponibles[key];
		}
		return total
	}

	if (localStorage.getItem('cantidadesDisponibles') === null) {
		cantidadesDisponibles = {
			'oso de anteojos': 3,
			'ocelote': 3,
			'condor': 3,
			'llama': 3,
			'venado': 3,
			'capybara': 3,
			'buho': 3,
			'serpiente': 3
		}
		updateDataStorage();
	} else {
		readDataStorage();
	}

	var index = 0;
	
	mostrarPregunta(index);

	function mostrarPregunta(index){
		preguntas[index].forEach(function(pregunta){
			$('body').append("<a id='" + pregunta + "'>" + pregunta + "</a><br/>")
		});	
	}	
	
	function quitarPregunta(index) {
		$('a').remove();
		$('br').remove();
	}

	var seleccionados = [];
	function asignarResultados(selected) {
		seleccionados = seleccionados.concat(treats[selected])
	}

	$(document).on('click', 'a', function(clicked){
		var selected = $(clicked.target).html();
	    quitarPregunta();
	    index ++;
	    if (index < preguntas.length){
	    	asignarResultados(selected)
	    	mostrarPregunta(index);
	    } else {
	    	mostrarResultado(calcularResultado());
	    	updateDataStorage();
	    }
	});

	var resultado = {}
	function calcularResultado(){
		seleccionados.forEach(function(seleccion){
			count = resultado[seleccion];
			count = (count == undefined) ? 1 : count+1;
			resultado[seleccion] = count;
		});
		resultado = sortResultados(resultado);

		return buscarDisponibilidad(resultado)
	}

	function sortResultados(resultado){
		var tmp = [];
		for (key in resultado) {
			tmp.push({'descripcion': key, 'count': resultado[key]});
		}
		return tmp.sort(function(a,b){return b.count - a.count});
	}	

	function buscarDisponibilidad(resultado) {
		var animalDisponible;
		for(var i=0; i<resultado.length; i+1){
			descripcion = resultado[i].descripcion
			disponibilidad = cantidadesDisponibles[descripcion]
			if (disponibilidad > 0){
				animalDisponible = descripcion;
				cantidadesDisponibles[descripcion] = disponibilidad - 1;
				break;
			}
		}
		return animalDisponible;
	}

	function mostrarResultado(ganador) {
		$('body').append("<div id='resultado'>" + ganador + "</div><br/>")
	}

	function updateDataStorage() {
		var dataAsString = JSON.stringify(cantidadesDisponibles);
		localStorage.setItem('cantidadesDisponibles', dataAsString);
	}

	function readDataStorage() {
		cantidadesDisponibles = JSON.parse(localStorage.getItem('cantidadesDisponibles'))
	}
})
