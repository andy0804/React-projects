import React ,{ Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummmary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat :1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients :{
            salad:0,
            bacon:0,
            cheese:0,
            meat: 0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing: false,
    }

   purchaseHandler = () =>  {
       this.setState({purchasing:true})
   }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey=>{
           return ingredients[igKey]
        })
        .reduce((sum,el)=> {return sum + el}, 0);
        this.setState({purchasable:sum > 0})
    }
    addIngredientHandler = (type) =>{

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
        ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddtion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice =  oldPrice +  priceAddtion ;
        this.setState({
            totalPrice:newPrice,
             ingredients:updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients);
    }
    purchaseCancelHandler = ()=> {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = ()=> {
        alert('You continue!')
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;

        const updatedIngredients = {
        ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice =  oldPrice -  priceSubtraction ;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
     this.updatePurchaseState(updatedIngredients);
    }
    render() {
        
        const disabledInfo = {
            ...this.state.ingredients
        }
          for(let key in disabledInfo){
              disabledInfo[key] = disabledInfo[key] <=0 ;
          }

        return (
            <Aux>
                <Modal 
                modalClosed = {this.purchaseCancelHandler}
                show={this.state.purchasing}>
                <OrderSummmary 
                price={this.state.totalPrice.toFixed(2)}
                purchaseCancelled ={ this.purchaseCancelHandler}
                purchaseContinued= {this.purchaseContinueHandler}
                ingredients ={this.state.ingredients}/>
                </Modal>
                <Burger  ingredients={this.state.ingredients}/>
                <BuildControls
                price = {this.state.totalPrice}
                ordered = {this.purchaseHandler}
                disabled = {disabledInfo}
                purchasable = {this.state.purchasable}
                ingredientRemoved={this.removeIngredientHandler} 
                ingredientAdded={this.addIngredientHandler}/>

            </Aux>
        );
    }
}
export default BurgerBuilder;