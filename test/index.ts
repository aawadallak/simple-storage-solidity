import { assert } from "chai"
import { Contract } from "ethers"
import { ethers } from "hardhat"
import { SimpleStorage } from "../typechain/SimpleStorage"
import { SimpleStorage__factory } from "../typechain/factories/SimpleStorage__factory"

describe("Deploy", function () {
    let factory: SimpleStorage__factory
    let simpleStorage: SimpleStorage

    beforeEach(async function () {
        factory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory

        simpleStorage = await factory.deploy()
    })

    it("should deploy a contract", async function () {
        assert.isNotNull(simpleStorage.address)
    })

    it("Should start retrieve with the 0 value", async function () {
        const value = await simpleStorage.retrieve()
        assert.equal(value.toString(), "0")
    })

    it("Should update when we call store", async function () {
        const expected = "7"

        const txResponse = await simpleStorage.store(expected)
        await txResponse.wait(1)

        const value = await simpleStorage.retrieve()
        assert.equal(value.toString(), expected)
    })

    it("Should expected to be 0 after call clear", async function () {
        const expected = "0"

        const txResponse = await simpleStorage.store("7")
        await txResponse.wait(1)

        const clearResponse = await simpleStorage.clear()
        await clearResponse.wait(1)

        const value = await simpleStorage.retrieve()
        assert.equal(value.toString(), expected)
    })
})
