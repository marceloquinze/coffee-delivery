import { HeroContainer, HeroWrapperContainer } from './styles'
import CupImage from '../../../../assets/Coffe-Delivery-Cup.png'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { HighlightItem } from './HighlightItem'
import heroBackground from '../../../../assets/Header-Background.png'

export function Hero() {
  return (
    <HeroWrapperContainer className="hero-background">
      <HeroContainer className="hero-container">
        <div className="left">
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <h2>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </h2>
          <div className="highlights">
            <HighlightItem
              color={'yellow-dark'}
              text="Compra simples e segura"
              icon={<ShoppingCart size={16} weight="fill" />}
            />
            <HighlightItem
              color={'base-text'}
              text="Embalagem mantém o café intacto"
              icon={<Package size={16} weight="fill" />}
            />
            <HighlightItem
              color={'yellow'}
              text="Entrega rápida e rastreada"
              icon={<Timer size={16} weight="fill" />}
            />
            <HighlightItem
              color={'purple'}
              text="O café chega fresquinho até você"
              icon={<Coffee size={16} weight="fill" />}
            />
          </div>
        </div>
        <div className="right">
          <img
            src={CupImage}
            alt="A white cup of coffee with a black strip showing the Coffee Delivery logo"
          />
        </div>
      </HeroContainer>
      <img className="heroBg" src={heroBackground} alt="" />
    </HeroWrapperContainer>
  )
}
