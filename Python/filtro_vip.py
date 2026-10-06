lista_vip = []

for vuelta in range (3):
  nombre = input("ingrese su nombre:")
  if nombre == "dani":
    print("entrada permitida")
    lista_vip.append(nombre)
  else:
    print("acceso denegado")
print("lista de permitidos:", lista_vip)