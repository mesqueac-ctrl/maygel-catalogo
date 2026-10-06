def aplicar_descuento(precio, descuento):
    ahorro = precio * (descuento/100)
    precio_final = precio - ahorro
    return precio_final
oferta = aplicar_descuento(80000, 20)
print ("el precio final a cobrar es:", oferta)
