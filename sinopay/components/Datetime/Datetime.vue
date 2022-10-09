<template>
	<view >
		<u-datetime-picker
			:show="show"
			v-model="value1"
			mode="date"
			@confirm="handleConfirmDate"
			@cancel="handleCancel"
			
		></u-datetime-picker>
		<!-- :maxDate="maxDate"
			:minDate="minDate" -->
		<!-- <u-button @click="show = true">打开</u-button> -->
		<view 
			class="show-wrapper u-flex u-flex-items-center"
			
		>
			<view class="item u-flex-1 u-m-r-12"
				@click="handleShowDatetimePiker(1)"
			>
				<u-input
					:value="time1 | timeFormat"
					disabled
					disabledColor="#fff"
					placeholder="起始日期"
					inputAlign="center"
				></u-input>
			</view>
			<view class="item">-</view>
			<view class="item u-flex-1 u-m-l-12"
				@click="handleShowDatetimePiker(2)"
			>
				<u-input
					:value="time2 | timeFormat"
					disabled
					disabledColor="#fff"
					placeholder="结束日期"
					inputAlign="center"
				></u-input>
			</view>
		</view>
	</view>
</template>

<script>
	const jiange = 3*30*24*60*60*1000;
	export default {
		data() {
			return {
				time1: '',
				time2: '',
				currentIndex: 0,
				show: false,
				value1: Number(new Date()),
				minDate: new Date().getTime() - jiange,
				maxDate: new Date().getTime(),
				jiange: jiange,
			}
		},
		filters: {
			timeFormat(v) {
				if(!v) return ""
				return uni.$u.timeFormat(v, 'yyyy年mm月dd');
			}
		},
		watch: {
			currentIndex() {
				
			},
			maxDate(n) {
				if(n > Number(new Date())) this.maxDate =  Number(new Date())
			},
			value1(n) {
				if(this.currentIndex == 1) {
					this.minDate = n
					this.maxDate = n + this.jiange
				}
				else if(this.currentIndex == 2) {
					this.maxDate = n
					this.minDate = n - this.jiange
				}
			},
			time1(n) {
				if(this.time2) {
					this.$emit('getdata', {time1: this.time1, time2: this.time2})
				}
			},
			time2(n) {
				if(this.time1) {
					this.$emit('getdata', {time1: this.time1, time2: this.time2})
				}
			},
		},
		methods: {
			handleShowDatetimePiker(index) {
				this.currentIndex = index
				this.show = true
			},
			handleConfirmDate(date) {
				this.show = false
				this[`time${this.currentIndex}`] = date.value;
				
			},
			handleCancel() {
				this.show = false
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
