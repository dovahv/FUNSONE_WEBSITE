class HomeController < ApplicationController

layout 'home'
	def index
		@coordinador = Coordinador.all.order('created_at DESC')
		
	end

	def ayudas_sociales
		@ayudas = Tipo.all.order('created_at DESC')
	end
end
