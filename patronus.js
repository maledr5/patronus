$(document).ready(function(){

    var $container = $(".container");

	var FUERZA ='fuerza';
	var TRABAJODURO ='trabajo duro';
	var AVENTURA ='aventura';
	var AMABILIDAD  ='amabilidad ';
	var SABIDURIA ='sabiduría';
	var ASTUCIA ='astucia';
	var AMBICION ='ambición';
	var DETERMINACION ='determinación';
	var JUSTICIA ='justicia';
	var EQUIDAD ='equidad';
	var AMISTAD ='amistad';
	var VALOR ='valor';
	var INSTINTODECONSERVACION ='instinto de conservación';
	var DEDICACION ='dedicación';
	var CREATIVIDAD ='creatividad';
	var FIDELIDAD ='fidelidad';
	var INTELIGENCIA ='inteligencia';
	var TOLERANCIA ='tolerancia';
	var CORRER ='correr';
	var SALTAR ='saltar';
	var OBSERVAR ='observar';
	var COMER ='comer';
	var HABLAR ='hablar';
	var PENSAR ='pensar';
	var ESCUCHAR ='escuchar';
	var LEER ='leer';
	var JUGAR ='jugar';
	var BOSQUE ='bosque';
	var MAR ='mar';
	var MONTANAS ='montañas';
	var DESIERTO ='desierto';

    var OSO = 'oso de anteojos';
    var OCELOTE = 'ocelote';
    var CONDOR = 'condor';
    var LLAMA = 'llama';
    var VENADO = 'venado';
    var CAPYBARA = 'capybara';
    var BUHO = 'buho';
    var SERPIENTE = 'serpiente';

	treats = {};
    treats[FUERZA] = [OSO, OCELOTE];
    treats[TRABAJODURO] = [CONDOR, LLAMA];
    treats[AVENTURA] = [VENADO, CAPYBARA];
    treats[AMABILIDAD ] = [LLAMA, CAPYBARA];
    treats[SABIDURIA] = [BUHO, CONDOR];
    treats[ASTUCIA] = [SERPIENTE, OCELOTE];
	treats[AMBICION] = [SERPIENTE, OCELOTE];
	treats[DETERMINACION] = [LLAMA, BUHO];
	treats[JUSTICIA] = [OSO, CONDOR];
	treats[EQUIDAD] = [CAPYBARA, BUHO];
	treats[AMISTAD] = [OSO, VENADO];
	treats[VALOR] = [OCELOTE, SERPIENTE];
	treats[INSTINTODECONSERVACION] = [CAPYBARA, SERPIENTE];
	treats[DEDICACION] = [BUHO, CONDOR];
	treats[CREATIVIDAD] = [VENADO, OSO];
	treats[FIDELIDAD] = [OSO, LLAMA];
	treats[INTELIGENCIA] = [SERPIENTE, BUHO];
	treats[TOLERANCIA] = [CAPYBARA, OCELOTE];
	treats[CORRER] = [OCELOTE, LLAMA];
	treats[SALTAR] = [VENADO, OSO];
	treats[OBSERVAR] = [BUHO, CONDOR];
	treats[COMER] = [CAPYBARA, LLAMA];
	treats[HABLAR] = [OCELOTE, VENADO];
	treats[PENSAR] = [BUHO, CONDOR];
	treats[ESCUCHAR] = [OSO, LLAMA];
	treats[LEER] = [SERPIENTE, CONDOR];
	treats[JUGAR] = [VENADO, CAPYBARA];
	treats[BOSQUE] = [OSO, CAPYBARA];
	treats[MAR] = [OCELOTE, BUHO];
	treats[MONTANAS] = [LLAMA, CONDOR];
	treats[DESIERTO] = [SERPIENTE, VENADO];

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
		[MONTANAS, DESIERTO]
	];

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
		};
		updateDataStorage();
	} else {
		readDataStorage();
	}

	var index = 0;

	mostrarPregunta(index);

	function mostrarPregunta(index){
		preguntas[index].forEach(function(pregunta){
			$container.append("<div data-treat='" + pregunta + "' class='pregunta'>" + pregunta + "</div>")
		});
	}

	function quitarPregunta() {
		$('.pregunta').remove();
	}

	var seleccionados = [];
	function asignarResultados(selected) {
		seleccionados = seleccionados.concat(treats[selected])
    }

	$(document).on('click', '.pregunta', function(){
		var selected = $(this).data("treat");
	    quitarPregunta();
	    index ++;
	    if (index < preguntas.length){
	    	asignarResultados(selected);
	    	mostrarPregunta(index);
	    } else {
	    	mostrarResultado(calcularResultado());
	    	updateDataStorage();
	    }
	});

	var resultado = {};
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
        var sort = tmp.sort(function(a, b){return b.count - a.count});
        return sort;
	}

	function buscarDisponibilidad(resultado) {
		var animalDisponible;
		for(var i=0; i<resultado.length; i=i+1){
			descripcion = resultado[i].descripcion;
			disponibilidad = cantidadesDisponibles[descripcion];
			if (disponibilidad > 0){
				animalDisponible = descripcion;
				cantidadesDisponibles[descripcion] = disponibilidad - 1;
				break;
			} 
		}
		return animalDisponible;
	}

	function mostrarResultado(ganador) {
		$container.append("<div id='resultado'>" + ganador + "</div><br/>")
	}

	function updateDataStorage() {
		var dataAsString = JSON.stringify(cantidadesDisponibles);
		localStorage.setItem('cantidadesDisponibles', dataAsString);
	}

	function readDataStorage() {
		cantidadesDisponibles = JSON.parse(localStorage.getItem('cantidadesDisponibles'));
	}
})
