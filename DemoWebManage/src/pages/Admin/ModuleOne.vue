<template>
	<div >
		<a-divider>长按进行拖拽排序下列文字</a-divider>
		<section>
				<div draggable="true" @dragstart="dragstart(num)" @dragend="dragend(num,index)"  @dragenter="dragEnter(num,index)"
					class="cell" :class="{active:lastEnterIndex===index}"
					 v-for="(num,index) in defaultArr" :key="index">
					{{num}}
				</div>
		</section>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				defaultArr:['我','是','中','国','人','我','热','爱','祖','国'],
				lastEnterIndex: null,
			}
		},
		mounted() {
			
		},
		methods:{
			
			dragstart(num) { // 拖拽元素开始
				// console.log('start', num);
			},
			dragend(num, ind) { // 拖拽元素结束
				// console.log('end', num,ind);
				const lastInd=this.lastEnterIndex;
				if(lastInd){
					[this.defaultArr[ind],this.defaultArr[lastInd]]=[this.defaultArr[lastInd],this.defaultArr[ind]];
					this.lastEnterIndex=null;
					this.$forceUpdate();
				}
				console.log(this.defaultArr);
			},
			dragEnter(num, ind){ // 拖拽的元素A进入某元素B
				// console.log('进入', num,ind);
				this.lastEnterIndex=ind;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.moduleAll{
		display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
		section{
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			width: 620px;
		}
		.cell{
			width:100px;
			height:100px;
			margin: 10px;
			border:1px solid;
			font-size: 30px;
			transition: all .1s;

			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			color: gray;
			background: #e6f7ff;
			// border-color: #91d5ff;
			&.active{
				color: #1890ff;
				background: #e6f7ff;
				border-color: #91d5ff;
				transform: scale(1.2);
			}
		}
	}
</style>
