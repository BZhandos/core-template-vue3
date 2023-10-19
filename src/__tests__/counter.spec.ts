import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Пример теста каунтера', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Проверка без параметра', () => {
        const counter = useCounterStore()
        expect(counter.count).toBe(0)
        counter.increment()
        expect(counter.count).toBe(1)
    })

    it('Проверка с параметром', () => {
        const counter = useCounterStore()
        counter.increment(10)
        expect(counter.count).toBe(10)
    })

    it('Проверка doubleCount и increment в скоупе', () => {
        const counter = useCounterStore()
        expect(counter.doubleCount).toBe(0)
        counter.increment()
        expect(counter.count).toBe(1)
        expect(counter.doubleCount).toBe(2)
    })
})
