require 'test_helper'

class MenuControllerTest < ActionDispatch::IntegrationTest
  test "should get diagrama_flujo" do
    get menu_diagrama_flujo_url
    assert_response :success
  end

  test "should get comentarios" do
    get menu_comentarios_url
    assert_response :success
  end

  test "should get cambios_aprobados" do
    get menu_cambios_aprobados_url
    assert_response :success
  end

  test "should get estadisticas" do
    get menu_estadisticas_url
    assert_response :success
  end

  test "should get contribuidores" do
    get menu_contribuidores_url
    assert_response :success
  end

end
